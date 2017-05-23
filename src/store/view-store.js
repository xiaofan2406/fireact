import { observable, action } from 'mobx';

class ViewStore {
  @observable focusedTarget = '';
  @observable editingItemId = '';

  @action setFocusedTarget = uuid => {
    this.focusedTarget = uuid;
  };

  @action setEditingItemId = uuid => {
    this.editingItemId = uuid;
  };

  @action unfocusTarget = uuid => {
    if (this.focusedTarget === uuid) {
      this.focusedTarget = '';
    }
  };

  @action finishEditingItem = uuid => {
    if (this.editingItemId === uuid) {
      this.editingItemId = '';
    }
  };
}

export default ViewStore;
