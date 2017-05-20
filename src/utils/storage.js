const PREFIX = 'FIREACT';
const LOGINKEY = `${PREFIX}-LOGIN`;

export const saveLogin = js => {
  localStorage.setItem(LOGINKEY, JSON.stringify(js));
};

export const removeLogin = () => {
  localStorage.removeItem(LOGINKEY);
};

export const loadLogin = () => {
  const saved = localStorage.getItem(LOGINKEY);
  try {
    const js = JSON.parse(saved);
    return js;
  } catch (e) {
    console.error(e);
    removeLogin();
    return null;
  }
};
