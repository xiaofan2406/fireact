/* import all store here, or combine them into one store */
import UserStore from './user-store';
import BoardStore from './board-store';

export default initialState => {
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};

  const userStore = new UserStore(initUser);
  const boardStore = new BoardStore(initBoard);

  BoardStore.injectStore({ userStore });

  return {
    userStore,
    boardStore
  };
};
