const PREFIX = 'FIREACT';
const LOGINKEY = `${PREFIX}-LOGIN`;
const BOARDKEY = `${PREFIX}-BOARD`;

export const saveLogin = data => {
  localStorage.setItem(LOGINKEY, JSON.stringify(data));
};

export const removeLogin = () => {
  localStorage.removeItem(LOGINKEY);
};

export const loadLogin = () => {
  const saved = localStorage.getItem(LOGINKEY);
  try {
    const login = JSON.parse(saved);
    return login;
  } catch (err) {
    console.error(err);
    removeLogin();
    return null;
  }
};

export const cacheBoard = data => {
  console.log(data);
  localStorage.setItem(BOARDKEY, JSON.stringify(data));
};

export const clearBoardCache = () => {
  localStorage.removeItem(BOARDKEY);
};

export const loadBoardCache = () => {
  const cache = localStorage.getItem(BOARDKEY);
  try {
    const board = JSON.parse(cache);
    return board;
  } catch (err) {
    console.log(err);
    clearBoardCache();
    return null;
  }
};
