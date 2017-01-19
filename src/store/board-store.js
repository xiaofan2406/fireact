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

  constructor(init = {}) {
    this.lists = init.lists || new Map();
    this.boardRef = null;
    this.itemRef = null;
  }

  static withUserStore(userStore) {
    this.userStore = userStore;
  }

  @computed get isEmpty() {
    return this.lists.size === 0;
  }

  getLists() {
    this.boardRef = firebase.database().ref(`${BoardStore.userStore.uid}/${boardPath}`);

    this.boardRef.on('child_added', (snapshot) => {
      this.addList(snapshot);
    });

    this.boardRef.on('child_removed', (snapshot) => {
      this.removeList(snapshot.key);
    });
  }

  getItems() {
    this.itemRef = firebase.database().ref(`${BoardStore.userStore.uid}/${itemPath}`);

    this.itemRef.on('child_added', (snapshot) => {
      this.addItem(snapshot);
    });

    this.itemRef.on('child_removed', (snapshot) => {
      this.removeItem(snapshot);
    });
  }

  @action addList(snapshot) {
    const list = new List({
      id: snapshot.key,
      path: `${BoardStore.userStore.uid}/${boardPath}/${snapshot.key}`,
      ...snapshot.val()
    });
    this.lists.set(snapshot.key, list);
  }

  @action removeList(id) {
    this.lists.delete(id);
  }

  @action removeItem(item) {
    this.lists.get(item.listId).removeItem(item);
  }

  @action addItem(snapshot) {
    const item = new Item({
      id: snapshot.key,
      path: `${BoardStore.userStore.uid}/${itemPath}/${snapshot.key}`,
      ...snapshot.val()
    });
    this.lists.get(item.listId).addItem(item);
  }

  newList(title) {
    // todo: validate user input here
    this.boardRef.push({ title });
  }

  newItem(title, listId) {
    // todo: validate user input here
    this.itemRef.push({ title, listId, completed: false, description: '' });
  }
}


export default BoardStore;
