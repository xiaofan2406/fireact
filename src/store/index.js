/* import all boardStore here, or combine them into one boardStore */
import UserStore from './user-store';
import BoardStore from './board-store';

export default function createStore(initialState) {
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};

  const userStore = new UserStore();
  const boardStore = new BoardStore(initBoard);

  BoardStore.injectStore({ userStore });

  if (initUser) {
    userStore.login(initUser);
    boardStore.initialSync();
  }

  return {
    userStore,
    boardStore
  };
}
