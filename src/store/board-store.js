import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import { firebase, boardCacher, uuid } from 'utils';
import { List } from './models';

const listsPath = 'lists';
const itemsPath = 'items';
const inboxListId = '__inbox__';

class BoardStore {
  @observable isLoading;
  @observable isSyncing;
  @observable errorMessage;

  constructor(init) {
    this.isLoading = false;
    this.isSyncing = false;
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
    this.selectedList = { prev: null, current: null };
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

      await this.ensureInboxExist();

      this.setLoadingStatus(false);
      this.initListeners();
      this.autoSave();
      this.setSyncingStatus(false);
    } catch (e) {
      // TODO check firebase docs to see the error shape
      this.setErrorMessage(JSON.stringify(e));
    }
  };

  ensureInboxExist = async () => {
    if (!this.hasList(inboxListId)) {
      await this._listsRef.child(inboxListId).set({
        name: 'Inbox',
        createdAt: new Date().toISOString()
      });
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

  @computed get availableLists() {
    return this.lists.values().filter(list => list.id !== inboxListId);
  }

  @computed get isEmpty() {
    return this.availableLists.length === 0;
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
    if (!itemData.listId || !this.hasList(itemData.listId)) {
      itemData.listId = inboxListId;
    }
    const item = this.lists.get(itemData.listId).addItem(itemData);
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

      if (list) {
        list.removeItem(id);
      } else {
        // item's list id is not in the board
        console.log('[removeItem 1] hum... this should not happen');
      }
      this.items.delete(id);
    } else {
      console.log('[removeItem 2] hum... this should not happen');
    }
  };

  hasList = id => this.lists.has(id);

  hasItem = id => this.items.has(id);

  newList = () => {
    const listData = {
      id: uuid(),
      createdAt: new Date().toISOString()
    };

    const list = this.addList(listData);
    this.selectList(list.id);
    this._listsRef.child(listData.id).set(list.selfie());
  };

  newItem = listId => {
    listId = listId || this.selectedList.current;
    // add client side data first
    const itemData = {
      id: uuid(),
      listId,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      isTrashed: false,
      notes: ''
    };

    const item = this.addItem(itemData);
    this.startEditingItem(item.id);
    this._itemsRef.child(item.id).set(item.selfie());
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
    this.items.get(id).finishEditing().getContainer().focus();
  };

  @computed get isEditingItem() {
    return this.items.values().some(item => item.isEditing);
  }

  selectList = id => {
    // safely assume id is included in lists' ids
    this.selectedList.prev = id;
  };

  reselectList = () => {
    this.selectedList.current = this.selectedList.prev;
  };

  unselectList = id => {
    if (id === this.selectedList.prev) {
      this.selectedList.prev = null;
    }
  };

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
