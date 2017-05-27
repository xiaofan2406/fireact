import { observable, action, computed } from 'mobx';

class UserStore {
  @observable email;
  @observable displayName;
  @observable token;

  constructor(init) {
    this.uid = init.uid || null;
    this.email = init.email || null;
    this.displayName = init.displayName || null;
    this.token = init.token || null;
  }

  @action login(info) {
    this.uid = info.uid;
    this.email = info.email;
    this.displayName = info.displayName;
    this.token = info.token;
  }

  @computed get isAuthed() {
    return Boolean(this.email && this.token && this.displayName);
  }

  @action logout() {
    this.token = null;
    this.email = null;
    this.displayName = null;
    this.uid = null;
  }
}

export default UserStore;
