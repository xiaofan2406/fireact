import { observable, action, computed, ObservableMap } from 'mobx';
import { firebase } from 'utils';
import Item from './Item';

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

export default List;
