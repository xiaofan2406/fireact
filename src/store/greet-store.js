import { observable, action, computed } from 'mobx';


class GreetStore {
  @observable message;
  @observable times;

  constructor(init = {}) { // this allows store initialization or load saved states
    this.message = init.message || 'World';
    this.times = init.times || 1;
  }

  @action setMessage(message) {
    this.message = message;
  }

  @action setTimes(times) {
    this.times = times > 0 ? times : 1;
  }

  @action reset() {
    this.message = 'World';
    this.times = 1;
  }

  @computed get greeting() {
    return Array(this.times).fill(this.message).join(' ');
  }
}


export default GreetStore;
