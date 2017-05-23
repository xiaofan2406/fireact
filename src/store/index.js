/* import all store here, or combine them into one store */
import GreetStore from './greet-store';
import UserStore from './user-store';
import BoardStore from './board-store';
import ViewStore from './view-store';

export default initialState => {
  const initGreet = initialState.greetStore || {};
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};
  const initView = initialState.viewStore || {};

  const greetStore = new GreetStore(initGreet);
  const userStore = new UserStore(initUser);
  const boardStore = new BoardStore(initBoard);
  const viewStore = new ViewStore(initView);

  BoardStore.withUserStore(userStore);

  return {
    greetStore,
    userStore,
    boardStore,
    viewStore
  };
};
