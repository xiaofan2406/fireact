import { observable, action, computed, ObservableMap, toJS } from 'mobx';
import { firebase } from 'utils';
import Item from './Item';

class List {
  @observable name;

  constructor(init) {
    this.id = init.id;
    this.createdAt = new Date(init.createdAt);

    this.path = init.path;
    this.ref = firebase.database().ref(this.path);

    this.name = init.name || '';
    this.items = new ObservableMap();
  }

  selfie = () => ({
    createdAt: this.createdAt.toISOString(),
    name: this.name
  });

  @action sync = newData => {
    this.path = newData.path;
    this.ref = firebase.database().ref(this.path);
    this.name = newData.name;
  };

  @action addItem = itemData => {
    if (!this.hasItem(itemData.id)) {
      this.items.set(itemData.id, new Item(itemData));
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

  @computed get activeItems() {
    return this.items.values().filter(item => !item.isTrashed);
  }

  destroy = () => {
    this.ref.remove();
  };

  @action setName = name => {
    this.name = name;
    this.ref.set({ ...this.selfie(), name });
  };

  getCachableData = () =>
    toJS({
      id: this.id,
      path: this.path,
      name: this.name
    });
}

export default List;
