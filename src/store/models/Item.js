import { observable, action, computed } from 'mobx';
import { firebase } from 'utils';

class Item {
  @observable name;
  @observable notes;
  @observable listId;
  @observable isCompleted;
  @observable isTrashed;
  @observable isEditing;

  constructor(init) {
    this.id = init.id;
    this.createdAt = new Date(init.createdAt);

    this.path = init.path;
    this.ref = firebase.database().ref(this.path);
    this.isEditing = false;

    this.name = init.name || '';
    this.notes = init.notes || '';
    this.listId = init.listId || '';
    this.isCompleted = init.isCompleted || false;
    this.isTrashed = init.isTrashed || false;
    // a function to get its container ref, assigned in `Item`
    this.getContainer = () => {};
  }

  // return the data shape in sync with firebase database
  selfie = () => ({
    createdAt: this.createdAt.toISOString(),
    listId: this.listId,
    name: this.name,
    notes: this.notes,
    isCompleted: this.isCompleted,
    isTrashed: this.isTrashed
  });

  destroy = () => {
    this.ref.remove();
  };

  // overwrite the current data with the newData
  @action sync = newData => {
    this.listId = newData.listId;
    this.path = newData.path;
    this.ref = firebase.database().ref(this.path);

    this.name = newData.name;
    this.notes = newData.notes || '';
    this.isCompleted = newData.isCompleted || false;
    this.isTrashed = newData.isTrashed || false;
  };

  @action setName = name => {
    if (name !== this.name) {
      this.name = name;
      this.ref.set({ ...this.selfie(), name });
    }
  };

  @action setNotes = notes => {
    if (notes !== this.notes) {
      this.notes = notes;
      this.ref.set({ ...this.selfie(), notes });
    }
  };

  @computed
  get hasNotes() {
    return this.notes !== '';
  }

  @action setCompletionStatus = status => {
    if (this.isCompleted !== status) {
      this.isCompleted = status;
      this.ref.set({ ...this.selfie(), isCompleted: status });
    }
  };

  @action move = listId => {
    this.listId = listId;
  };

  @action trash = () => {
    if (!this.isTrashed) {
      this.isTrashed = true;
      this.ref.set({ ...this.selfie(), isTrashed: true });
    }
  };

  @action restore = () => {
    if (this.isTrashed) {
      this.isTrashed = false;
      this.ref.set({ ...this.selfie(), isTrashed: false });
    }
  };

  @action startEditing = () => {
    this.isEditing = true;
  };

  @action finishEditing = () => {
    this.isEditing = false;
    return this;
  };
}

export default Item;
