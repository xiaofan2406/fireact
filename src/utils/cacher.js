const PREFIX = 'FIREACT';

const makeCacherFor = name => ({
  key: `${PREFIX}-${name.toUpperCase()}`,
  cache(data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },
  clear() {
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

export const login = makeCacherFor('login');
export const board = makeCacherFor('board');
