import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import { firebase, boardCacher } from 'utils';
import { List } from './models';

const listsPath = 'lists';
const itemsPath = 'items';

class BoardStore {
  @observable lists;
  @observable isLoading;
  @observable isSyncing;

  constructor(init) {
    this.loading = false;
    this._listsRef = null;
    this._itemsRef = null;

    this.lists = new ObservableMap();
    if (init.lists) {
      Object.values(init.lists).map(listData => this.addList(listData));
    }

    this._items = new ObservableMap();
  }

  static withUserStore(userStore) {
    this.userStore = userStore;
  }

  initialSync = async () => {
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

    const [lists, items] = (await Promise.all([
      this._listsRef.once('value'),
      this._itemsRef.once('value')
    ])).map(result => result.val());

    if (lists) {
      const listIds = Object.keys(lists);

      // remove cached list that are no longer in the server
      this.lists
        .keys()
        .filter(id => !listIds.includes(id))
        .map(id => {
          console.log(this.lists.get(id));
          return id;
        })
        .map(id => this.lists.delete(id));

      // add the lists in the server to client or sync its data
      listIds.map(id =>
        this.addList({
          id,
          ...lists[id],
          path: `${BoardStore.userStore.uid}/${listsPath}/${id}`
        })
      );
    }

    if (items) {
      Object.keys(items).map(id =>
        this.addItemToList({
          id,
          ...items[id],
          path: `${BoardStore.userStore.uid}/${itemsPath}/${id}`
        })
      );
    }
    this.setLoadingStatus(false);
    this.initListeners();
    this.autoSave();
    this.setSyncingStatus(false);
  };

  @action setSyncingStatus = status => {
    this.isSyncing = status;
  };

  @action setLoadingStatus = status => {
    this.isLoading = status;
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
      this.addItemToList(itemData);
    });

    // NOTE this isn't trigger in the front-end
    this._listsRef.on('child_removed', snapshot => {
      if (this.hasList(snapshot.key)) {
        this.removeList(snapshot.key);
      }
    });

    // NOTE this isn't trigger in the front-end
    this._itemsRef.on('child_removed', snapshot => {
      this.removeItemFromList(snapshot.val());
    });
  };

  @action addList = listData => {
    if (!this.hasList(listData.id)) {
      const list = new List(listData);
      this.lists.set(list.id, list);
    } else {
      this.lists.get(listData.id).sync(listData);
    }
  };

  @action addItemToList = itemData => {
    if (this.hasList(itemData.listId)) {
      const item = this.lists.get(itemData.listId).addItem(itemData);
      this._items.set(item.id, item);
    }
    // TODO add the item to `inbox`
  };

  @action removeItemFromList = itemData => {
    if (this.hasList(itemData.listId)) {
      this.lists.get(itemData.listId).removeItem(itemData.id);
      this._items.delete(itemData.id);
    }
  };

  hasList = id => this.lists.has(id);

  hasItem = id => this._items.has(id);

  @action selectOnlyItem = itemId => {
    this._items
      .values()
      .map(item => item.setSelectionStatus(item.id === itemId));
  };

  @action editOnlyItem = itemId => {
    this._items.values().map(item => item.setEditingStatus(item.id === itemId));
  };

  newList = name => {
    this._listsRef.push({
      name: name.trim(),
      createdAt: new Date().toISOString()
    });
  };

  @action removeList = id => {
    this.lists.get(id).destroy();
    this.lists.delete(id);
  };

  newItem = listId => {
    if (this.hasList(listId)) {
      this._itemsRef.push({
        listId,
        isCompleted: false,
        notes: '',
        createdAt: new Date().toISOString()
      });
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
      lists: this.lists
    });

  stopAutoSave = () => {
    clearInterval(this.autoSaveInterval);
  };
}

export default BoardStore;
