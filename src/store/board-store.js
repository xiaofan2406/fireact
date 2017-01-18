import { observable, action, computed } from 'mobx';
import * as firebase from 'firebase';

const boardPath = 'board';


class List {
  @observable items;

  constructor(init = {}) {
    this.items = init.items || [];
    this.listRef = null;
    this.id = init.id || null;
    this.path = init.path || null;
    this.title = init.title || null;
    this.listRef = firebase.database().ref(this.path);
  }


  delete() {
    this.listRef.remove();
  }
}


class BoardStore {
  @observable lists;
  @observable loading;

  constructor(init = {}) {
    this.lists = init.lists || [];
    this.loading = false;
    this.boardRef = null;
  }

  static withUserStore(userStore) {
    this.userStore = userStore;
  }

  @computed get isEmpty() {
    return this.lists.length === 0;
  }

  getLists() {
    this.boardRef = firebase.database().ref(`${boardPath}/${BoardStore.userStore.uid}`);

    this.boardRef.on('child_added', (snapshot) => {
      this.pushToLists(snapshot);
    });

    this.boardRef.on('child_removed', (snapshot) => {
      this.removeFromList(snapshot.key);
    });
  }

  @action pushToLists(snapshot) {
    const list = new List({
      id: snapshot.key,
      path: `${boardPath}/${BoardStore.userStore.uid}/${snapshot.key}`,
      ...snapshot.val()
    });
    this.lists.push(list);
  }

  @action removeFromList(id) {
    this.lists = this.lists.filter(list => list.id !== id);
  }

  addList(title) {
    this.boardRef.push({
      title
    });
  }
}


export default BoardStore;
