/* import all store here, or combine them into one store */
import UserStore from './user-store';
import BoardStore from './board-store';
import ViewStore from './view-store';

export default initialState => {
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};
  const initView = initialState.viewStore || {};

  const userStore = new UserStore(initUser);
  const boardStore = new BoardStore(initBoard);
  const viewStore = new ViewStore(initView);

  BoardStore.injectSotre({ userStore, viewStore });

  return {
    userStore,
    boardStore,
    viewStore
  };
};
