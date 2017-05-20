const PREFIX = 'FIREACT';

const makeStorageFor = name => ({
  key: `${PREFIX}-${name.toUpperCase()}`,
  save(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  delete() {
    localStorage.removeItem(this.key);
  },
  load() {
    const saved = localStorage.getItem(this.key);
    try {
      const data = JSON.parse(saved);
      return data;
    } catch (err) {
      console.error(err);
      this[`clear${name}Cache`]();
      return null;
    }
  }
});

export const login = makeStorageFor('login');
export const board = makeStorageFor('board');
