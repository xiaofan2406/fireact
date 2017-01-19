import { observable, action, computed } from 'mobx';
import * as firebase from 'firebase';

const boardPath = 'boards';
const itemPath = 'items';

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

  delete() {
    this.ref.remove();
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
    this.lists = init.lists || new Map();
    this._items = init._items || new Map();
    this.loading = false;
    this._boardRef = null;
    this._itemRef = null;
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
    this.setLoading(true);
    this._boardRef = firebase.database().ref(`${BoardStore.userStore.uid}/${boardPath}`);
    this._itemRef = firebase.database().ref(`${BoardStore.userStore.uid}/${itemPath}`);

    const [lists, items] = (await Promise.all([this._boardRef.once('value'), this._itemRef.once('value')])).map(result => result.val());

    if (lists) {
      Object.keys(lists).map(id => this.addList({
        id,
        path: `${BoardStore.userStore.uid}/${boardPath}/${id}`,
        ...lists[id]
      }));
    }

    if (items) {
      Object.keys(items).map(id => this.addItem({
        id,
        path: `${BoardStore.userStore.uid}/${itemPath}/${id}`,
        ...items[id]
      }));
    }
    this.setLoading(false);
    this.initListeners();
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
    this._boardRef.on('child_added', (snapshot) => {
      if (!this.hasList(snapshot.key)) {
        const listData = {
          id: snapshot.key,
          path: `${BoardStore.userStore.uid}/${boardPath}/${snapshot.key}`,
          ...snapshot.val()
        };
        this.addList(listData);
      }
    });

    this._boardRef.on('child_removed', (snapshot) => {
      this.removeList(snapshot.key);
    });

    this._itemRef.on('child_added', (snapshot) => {
      if (!this.hasItem(snapshot.key)) {
        const itemData = {
          id: snapshot.key,
          path: `${BoardStore.userStore.uid}/${itemPath}/${snapshot.key}`,
          ...snapshot.val()
        };
        this.addItem(itemData);
      }
    });

    this._itemRef.on('child_removed', (snapshot) => {
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
    this._itemRef.push({ title, listId, completed: false, description: '' });
  }
}


export default BoardStore;
