import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import * as firebase from 'firebase';
import { board as boardStorage } from 'utils/storage';

const listsPath = 'lists';
const itemsPath = 'items';

class Item {
  @observable title;
  @observable description;
  @observable isCompleted;
  @observable isSelected;
  @observable isEditing;

  constructor(init) {
    this.id = init.id;
    this.listId = init.listId;
    this.path = init.path;
    this.ref = firebase.database().ref(this.path);

    this.title = init.title;
    this.description = init.description || '';
    this.isCompleted = init.isCompleted || false;
    this.isSelected = init.isSelected || false;
    this.isEditing = init.isEditing || false;
  }

  delete() {
    this.ref.remove();
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setCompletionStatus(status) {
    this.isCompleted = status;
  }

  @action setSelectionStatus(status) {
    this.isSelected = status;
  }

  @action setEditingStatus(status) {
    this.isEditing = status;
  }
}

class List {
  @observable items;
  @observable title;

  constructor(init) {
    this.id = init.id;
    this.title = init.title;
    this.path = init.path;
    this.ref = firebase.database().ref(this.path);

    this.items = new ObservableMap();
    if (init.items) {
      Object.values(init.items).map(itemData => this.addItem(itemData));
    }
  }

  @action addItem(itemData) {
    if (!this.hasItem(itemData.id)) {
      const item = new Item(itemData);
      this.items.set(itemData.id, item);
      return item;
    }
    return this.items.get(itemData.id);
  }

  hasItem(id) {
    return this.items.has(id);
  }

  @action removeItem(id) {
    this.items.delete(id);
  }

  @computed get isEmpty() {
    return this.items.size === 0;
  }

  delete() {
    this.ref.remove();
  }

  @action setTitle(title) {
    this.title = title;
  }
}

class BoardStore {
  @observable lists;
  @observable loading;

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

  async initialLoad() {
    if (this.isEmpty) {
      this.setLoading(true);
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
      Object.keys(lists).map(id =>
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
    this.setLoading(false);
    this.initListeners();
    this.autoSave();
  }

  initListeners() {
    this._listsRef.on('child_added', snapshot => {
      const listData = {
        id: snapshot.key,
        path: `${BoardStore.userStore.uid}/${listsPath}/${snapshot.key}`,
        ...snapshot.val()
      };
      this.addList(listData);
    });

    this._listsRef.on('child_removed', snapshot => {
      this.removeList(snapshot.key);
    });

    this._itemsRef.on('child_added', snapshot => {
      const itemData = {
        id: snapshot.key,
        path: `${BoardStore.userStore.uid}/${itemsPath}/${snapshot.key}`,
        ...snapshot.val()
      };
      this.addItemToList(itemData);
    });

    this._itemsRef.on('child_removed', snapshot => {
      this.removeItemFromList(snapshot.val());
    });
  }

  @computed get isEmpty() {
    return this.lists.size === 0;
  }

  hasList(id) {
    return this.lists.has(id);
  }

  getCachableData() {
    return toJS({
      lists: this.lists
    });
  }

  @action setLoading(bool) {
    this.loading = bool;
  }
  @action startLoading() {
    this.loading = true;
  }
  @action finishLoading() {
    this.loading = false;
  }

  @action addList(listData) {
    if (!this.hasList(listData.id)) {
      const list = new List(listData);
      this.lists.set(list.id, list);
    }
  }

  @action removeList(id) {
    this.lists.delete(id);
  }

  @action addItemToList(itemData) {
    if (this.hasList(itemData.listId)) {
      const item = this.lists.get(itemData.listId).addItem(itemData);
      this._items.set(item.id, item);
    }
  }

  @action removeItemFromList(itemData) {
    if (this.hasList(itemData.listId)) {
      this.lists.get(itemData.listId).removeItem(itemData.id);
      this._items.delete(itemData.id);
    }
  }

  @action selectOnlyItem(itemId) {
    this._items
      .values()
      .map(item => item.setSelectionStatus(item.id === itemId));
  }

  @action editOnlyItem(itemId) {
    this._items.values().map(item => item.setEditingStatus(item.id === itemId));
  }

  newList(title) {
    // todo: validate user input here
    this._listsRef.push({ title });
  }

  // newItem(title, listId) {
  //   // todo: validate user input here
  //   this._itemsRef.push({ title, listId, isCompleted: false, description: '' });
  // }

  autoSave() {
    boardStorage.save(this.getCachableData());
    this.autoSaveInterval = setInterval(() => {
      boardStorage.save(this.getCachableData());
    }, 1000 * 60 * 10);
  }

  stopAutoSave() {
    clearInterval(this.autoSaveInterval);
  }
}

export default BoardStore;
