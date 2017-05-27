import { observable, action } from 'mobx';
import { firebase } from 'utils';

class Item {
  @observable name;
  @observable notes;
  @observable listId;
  @observable isCompleted;
  @observable isTrashed;
  @observable isEditing;
  @observable isSelected;

  constructor(init) {
    this.id = init.id;
    this.createdAt = new Date(init.createdAt);

    this.path = init.path;
    this.ref = firebase.database().ref(this.path);
    this.isEditing = false;
    this.isSelected = false;

    this.name = init.name || '';
    this.notes = init.notes || '';
    this.listId = init.listId || '';
    this.isCompleted = init.isCompleted || false;
    this.isTrashed = init.isTrashed || false;
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
  };

  @action setName = name => {
    if (name !== this.name) {
      this.name = name;
      console.log('request');
      this.ref.set({ ...this.selfie(), name });
    }
  };

  @action setNotes = notes => {
    if (notes !== this.notes) {
      this.notes = notes;
      console.log('request');
      this.ref.set({ ...this.selfie(), notes });
    }
  };

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
    this.isTrashed = true;
  };
  @action restore = () => {
    this.isTrashed = false;
  };

  @action startEditing = () => {
    this.isEditing = true;
  };
  @action finishEditing = () => {
    this.isEditing = false;
  };

  @action setSelectionStatus = status => {
    this.isSelected = status;
  };
}

export default Item;
