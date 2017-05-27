import { observable, action, computed } from 'mobx';

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

  @action startEditingItem(id) {
    this.editingItemId = id;
  }

  @action finishEditingItem() {
    this.editingItemId = '';
  }

  @computed get isInEditMode() {
    return this.editingItemId !== '';
  }
  //
  // isEditingItem = item => item.id === this.editingItemId;
}

export default ViewStore;
