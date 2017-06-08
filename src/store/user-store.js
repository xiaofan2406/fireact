import { observable, action, computed } from 'mobx';
import { loginCacher } from 'utils';

class UserStore {
  uid = null;
  token = null;
  @observable email;
  @observable displayName;

  @action
  login = info => {
    this.uid = info.uid;
    this.email = info.email;
    this.displayName = info.displayName;
    this.token = info.token;
    loginCacher.cache(info);
  };

  @computed
  get isAuthed() {
    return Boolean(this.email && this.token && this.displayName);
  }

  @action
  logout = () => {
    this.token = null;
    this.email = null;
    this.displayName = null;
    this.uid = null;
    loginCacher.clear();
  };
}

export default UserStore;
