import { observable, action } from 'mobx';

class ViewStore {
  @observable focusedTarget = '';
  @observable editingItemId = '';

  @action focusTarget = id => {
    this.focusedTarget = id;
  };

  @action blurTarget = id => {
    if (this.focusedTarget === id) {
      this.focusedTarget = '';
    }
  };

  @action startEditingItem = id => {
    this.editingItemId = id;
  };

  @action finishEditingItem = id => {
    if (this.editingItemId === id) {
      this.editingItemId = '';
    }
  };
}

export default ViewStore;
