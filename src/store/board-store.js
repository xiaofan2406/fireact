import { observable, action, computed, toJS, ObservableMap } from 'mobx';
import * as firebase from 'firebase';
import { cacheBoard } from 'utils/storage';

const boardPath = 'lists';
const listPath = 'items';

class Item {
  @observable title;
  @observable description;
  @observable completed;

  constructor(init = {}) {
    this.id = init.id;
    this.listId = init.listId;
    this.title = init.title;
    this.path = init.path;
    this.completed = init.completed || false;
    this.description = init.description || '';
    this.ref = firebase.database().ref(this.path);
  }

  delete() {
    this.ref.remove();
  }

  @action setTitle(title) {
    this.title = title;
  }
}

class List {
  @observable items;
  @observable title;

  constructor(init = {}) {
    this.id = init.id;
    this.title = init.title;
    this.path = init.path;
    this.items = init.items || [];
    this.ref = firebase.database().ref(this.path);
  }

  @computed get isEmpty() {
    return this.items.length === 0;
  }

  delete() {
    this.ref.remove();
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action addItem(item) {
    this.items.push(item);
  }

  @action removeItem(id) {
    this.items = this.items.filter(item => item.id !== id);
  }
}

class BoardStore {
  @observable lists;
  @observable loading;
  @observable _items;

  constructor(init = {}) {
    console.log('creating with', init);

    this.lists = new ObservableMap();
    this._items = new ObservableMap();

    if (init.lists) {
      Object.values(init.lists).map(listData => this.addList(listData));
    }
    if (init._items) {
      Object.values(init._items).map(itemData => this.addList(itemData));
    }

    this.loading = false;

    this._boardRef = null;
    this._listRef = null;
  }

  static withUserStore(userStore) {
    this.userStore = userStore;
  }

  @computed get isEmpty() {
    return this.lists.size === 0;
  }

  hasList(id) {
    return this.lists.has(id);
  }

  hasItem(id) {
    return this._items.has(id);
  }

  async initialLoad() {
    if (this.isEmpty) {
      this.setLoading(true);
    }
    this._boardRef = firebase
      .database()
      .ref(`${BoardStore.userStore.uid}/${boardPath}`);
    this._listRef = firebase
      .database()
      .ref(`${BoardStore.userStore.uid}/${listPath}`);

    const [lists, items] = (await Promise.all([
      this._boardRef.once('value'),
      this._listRef.once('value')
    ])).map(result => result.val());

    if (lists) {
      Object.keys(lists).map(id =>
        this.addList({
          id,
          path: `${BoardStore.userStore.uid}/${boardPath}/${id}`,
          ...lists[id]
        })
      );
    }

    if (items) {
      Object.keys(items).map(id =>
        this.addItem({
          id,
          path: `${BoardStore.userStore.uid}/${listPath}/${id}`,
          ...items[id]
        })
      );
    }
    this.setLoading(false);
    this.initListeners();
    this.autoSave();
  }

  getCachableData() {
    return {
      lists: this.lists,
      _items: this._items
    };
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

  initListeners() {
    this._boardRef.on('child_added', snapshot => {
      if (!this.hasList(snapshot.key)) {
        const listData = {
          id: snapshot.key,
          path: `${BoardStore.userStore.uid}/${boardPath}/${snapshot.key}`,
          ...snapshot.val()
        };
        this.addList(listData);
      }
    });

    this._boardRef.on('child_removed', snapshot => {
      this.removeList(snapshot.key);
    });

    this._listRef.on('child_added', snapshot => {
      if (!this.hasItem(snapshot.key)) {
        const itemData = {
          id: snapshot.key,
          path: `${BoardStore.userStore.uid}/${listPath}/${snapshot.key}`,
          ...snapshot.val()
        };
        this.addItem(itemData);
      }
    });

    this._listRef.on('child_removed', snapshot => {
      this.removeItem(snapshot);
    });
  }

  @action addList(listData) {
    const list = new List(listData);
    this.lists.set(list.id, list);
  }

  @action removeList(id) {
    this.lists.delete(id);
  }

  @action addItem(itemData) {
    const item = new Item(itemData);
    this.lists.get(item.listId).addItem(item);

    this._items.set(item.id, item);
  }

  @action removeItem(item) {
    this.lists.get(item.listId).removeItem(item);
  }

  newList(title) {
    // todo: validate user input here
    this._boardRef.push({ title });
  }

  newItem(title, listId) {
    // todo: validate user input here
    this._listRef.push({ title, listId, completed: false, description: '' });
  }

  autoSave() {
    this.autoSaveInterval = setInterval(() => {
      console.log('gonna save');
      cacheBoard(toJS(this.getCachableData()));
    }, 1000 * 60 * 10);
  }

  stopAutoSave() {
    clearInterval(this.autoSaveInterval);
  }
}

export default BoardStore;
