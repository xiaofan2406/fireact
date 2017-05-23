import { observable, action } from 'mobx';
import { firebase } from 'utils';

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

export default Item;
