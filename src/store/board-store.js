import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import * as firebase from 'firebase';
import { board as boardStorage } from 'utils/storage';

const listsPath = 'lists';
const itemsPath = 'items';

class Item {
  @observable name;
  @observable notes;
  @observable isCompleted;
  @observable isSelected;
  @observable isEditing;

  constructor(init) {
    this.id = init.id;
    this.createdAt = new Date(init.createdAt);

    this.listId = init.listId;
    this.path = init.path;
    this.ref = firebase.database().ref(this.path);

    this.name = init.name || '';
    this.notes = init.notes || '';
    this.isCompleted = init.isCompleted || false;
    this.isSelected = false;
    this.isEditing = false;
  }

  selfie = () => ({
    listId: this.listId,
    createdAt: this.createdAt.toISOString(),
    name: this.name,
    notes: this.notes,
    isCompleted: this.isCompleted
  });

  destroy = () => {
    this.ref.remove();
  };

  @action sync = newData => {
    this.listId = newData.listId;
    this.path = newData.path;
    this.ref = firebase.database().ref(this.path);

    this.name = newData.name;
    this.name = newData.name || '';
    this.notes = newData.notes || '';
    this.isCompleted = newData.isCompleted || false;
  };

  @action setName = name => {
    this.name = name;
    this.ref.set({ ...this.selfie(), name });
  };

  @action setCompletionStatus = status => {
    if (this.isCompleted !== status) {
      this.isCompleted = status;
      this.ref.set({ ...this.selfie(), isCompleted: status });
    }
  };

  @action setSelectionStatus = status => {
    this.isSelected = status;
    if (status === false) {
      this.isEditing = false;
    }
  };

  @action setEditingStatus = status => {
    this.isEditing = status;
    if (status === true) {
      this.isSelected = true;
    }
  };
}

class List {
  @observable items;
  @observable name;

  constructor(init) {
    this.id = init.id;
    this.createdAt = new Date(init.createdAt);

    this.path = init.path;
    this.ref = firebase.database().ref(this.path);

    this.name = init.name || '';
    this.items = new ObservableMap();
    if (init.items) {
      Object.values(init.items).map(itemData => this.addItem(itemData));
    }
  }

  selfie = () => ({
    name: this.name,
    createdAt: this.createdAt.toISOString()
  });

  @action sync = newData => {
    this.path = newData.path;
    this.ref = firebase.database().ref(this.path);
    this.name = newData.name;
  };

  @action addItem = itemData => {
    if (!this.hasItem(itemData.id)) {
      const item = new Item(itemData);
      this.items.set(itemData.id, item);
    } else {
      this.items.get(itemData.id).sync(itemData);
    }

    return this.items.get(itemData.id);
  };

  hasItem = id => this.items.has(id);

  @action removeItem = id => {
    this.items.delete(id);
  };

  @computed get isEmpty() {
    return this.items.size === 0;
  }

  destroy = () => {
    this.ref.remove();
  };

  @action setName = name => {
    this.name = name;
    this.ref.set({ ...this.selfie(), name });
  };
}

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
    boardStorage.save(this.getCachableData());
    this.autoSaveInterval = setInterval(() => {
      boardStorage.save(this.getCachableData());
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
