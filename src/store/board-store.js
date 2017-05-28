import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import { firebase, boardCacher, uuid } from 'utils';
import { List, Item } from './models';

const listsPath = 'lists';
const itemsPath = 'items';

class BoardStore {
  @observable isLoading;
  @observable isSyncing;
  @observable errorMessage;

  constructor(init) {
    this.isLoading = false;
    this.isSyncing = false;
    this.inbox = new ObservableMap();
    this.lists = new ObservableMap();
    this.items = new ObservableMap();

    if (init.lists) {
      Object.values(init.lists).map(listData => this.addList(listData));
    }

    if (init.items) {
      Object.values(init.items).map(itemData => this.addItem(itemData));
    }

    this._listsRef = null;
    this._itemsRef = null;
  }

  static injectStore({ userStore }) {
    Object.assign(this, { userStore });
  }

  initialSync = async () => {
    this.setErrorMessage();
    this.setSyncingStatus(true);
    if (this.isEmpty) {
      this.setLoadingStatus(true);
    }

    this._listsRef = firebase
      .database()
      .ref(`${BoardStore.userStore.uid}/${listsPath}`);

    this._itemsRef = firebase
      .database()
      .ref(`${BoardStore.userStore.uid}/${itemsPath}`);

    try {
      const [lists, items] = (await Promise.all([
        this._listsRef.once('value'),
        this._itemsRef.once('value')
      ])).map(result => result.val());

      if (lists) {
        const listIds = Object.keys(lists);

        // remove cached lists that are no longer in the server
        this.lists
          .keys()
          .filter(id => !listIds.includes(id))
          .map(id => this.lists.delete(id));

        // add the lists in the server to client or sync its data
        listIds.map(id =>
          this.addList({
            id,
            ...lists[id],
            path: `${BoardStore.userStore.uid}/${listsPath}/${id}`
          })
        );
      } else {
        // server contains no lists for this user
        this.lists.clear();
      }

      if (items) {
        const itemIds = Object.keys(items);

        // remove cached items that are no longer in the server
        this.items
          .keys()
          .filter(id => !itemIds.includes(id))
          .map(id => this.items.delete(id));

        itemIds.map(id =>
          this.addItem({
            id,
            ...items[id],
            path: `${BoardStore.userStore.uid}/${itemsPath}/${id}`
          })
        );
      } else {
        // server contains no items for this user
        this.items.clear();
      }

      this.setLoadingStatus(false);
      this.initListeners();
      this.autoSave();
      this.setSyncingStatus(false);
    } catch (e) {
      // TODO check firebase docs to see the error shape
      this.setErrorMessage(JSON.stringify(e));
    }
  };

  @action setSyncingStatus = status => {
    this.isSyncing = status;
  };

  @action setLoadingStatus = status => {
    this.isLoading = status;
  };

  @action setErrorMessage = message => {
    this.errorMessage = message;
  };

  @computed get isEmpty() {
    return this.lists.size === 0;
  }

  initListeners = () => {
    this._listsRef.on('child_added', snapshot => {
      const listData = {
        id: snapshot.key,
        path: `${BoardStore.userStore.uid}/${listsPath}/${snapshot.key}`,
        ...snapshot.val()
      };
      this.addList(listData);
    });

    this._itemsRef.on('child_added', snapshot => {
      const itemData = {
        id: snapshot.key,
        path: `${BoardStore.userStore.uid}/${itemsPath}/${snapshot.key}`,
        ...snapshot.val()
      };
      this.addItem(itemData);
    });

    this._listsRef.on('child_removed', snapshot => {
      this.removeList(snapshot.key);
    });

    this._itemsRef.on('child_removed', snapshot => {
      this.removeItem(snapshot.key);
    });
  };

  @action addList = listData => {
    if (!this.hasList(listData.id)) {
      const list = new List(listData);
      this.lists.set(list.id, list);
    } else {
      this.lists.get(listData.id).sync(listData);
    }
    return this.lists.get(listData.id);
  };

  @action addItem = itemData => {
    let item;
    if (itemData.listId && this.hasList(itemData.listId)) {
      item = this.lists.get(itemData.listId).addItem(itemData);
    } else {
      itemData.listId = '';
      item = new Item(itemData);
      this.inbox.set(item.id, item);
    }
    this.items.set(item.id, item);
    return item;
  };

  @action removeList = id => {
    if (this.hasList(id)) {
      this.lists.get(id).items.forEach(item => {
        item.move(null);
      });

      this.lists.get(id).destroy();
      this.lists.delete(id);
    } else {
      console.log('[removeList] hum... this should not happen');
    }
  };

  @action removeItem = id => {
    if (this.hasItem(id)) {
      const item = this.items.get(id);
      const list = this.lists.get(item.listId);

      if (this.inbox.has(id)) {
        this.inbox.delete(id);
      } else if (list) {
        list.removeItem(id);
      } else {
        // item's list id is not in the board, and the item is not inbox
        console.log('[removeItem 1] hum... this should not happen');
      }
      this.items.delete(id);
    } else {
      console.log('[removeItem 2] hum... this should not happen');
    }
  };

  hasList = id => this.lists.has(id);

  hasItem = id => this.items.has(id);

  newList = name => {
    const listId = uuid();
    this._listsRef.child(listId).set({
      name,
      createdAt: new Date().toISOString()
    });
    return listId;
  };

  newItem = listId => {
    // add client side data first
    const itemData = {
      id: uuid(),
      listId,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      isTrashed: false,
      notes: ''
    };

    this.addItem(itemData);
    this.startEditingItem(itemData.id);

    this._itemsRef.child(itemData.id).set(itemData);
  };

  @action startEditingItem = id => {
    this.items.forEach(item => {
      if (item.id === id) {
        item.startEditing();
      } else {
        item.finishEditing();
      }
    });
  };

  @action finishEditingItem = id => {
    this.items.get(id).finishEditing();
  };

  @computed get isEditingItem() {
    return this.items.values().some(item => item.isEditing);
  }

  autoSave = () => {
    boardCacher.cache(this.getCachableData());
    this.autoSaveInterval = setInterval(() => {
      boardCacher.cache(this.getCachableData());
    }, 1000 * 60 * 10);
  };

  getCachableData = () =>
    toJS({
      lists: this.lists.values().map(list => list.getCachableData()),
      items: this.items
    });

  stopAutoSave = () => {
    clearInterval(this.autoSaveInterval);
  };
}

export default BoardStore;
