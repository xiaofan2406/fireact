import { observable, action } from 'mobx';

class ViewStore {
  @observable focusedTarget = '';
  @observable editingItemId = '';

  @action focusTarget = uuid => {
    this.focusedTarget = uuid;
  };

  @action blurTarget = uuid => {
    if (this.focusedTarget === uuid) {
      this.focusedTarget = '';
    }
  };

  @action startEditingItem = uuid => {
    this.editingItemId = uuid;
  };

  @action finishEditingItem = uuid => {
    if (this.editingItemId === uuid) {
      this.editingItemId = '';
    }
  };
}

export default ViewStore;
