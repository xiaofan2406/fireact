/* import all store here, or combine them into one store */
import GreetStore from './greet-store';
import UserStore from './user-store';
import BoardStore from './board-store';

export default (initialState) => {
  const initGreet = initialState.greetStore || {};
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};

  const greetStore = new GreetStore(initGreet);
  const userStore = new UserStore(initUser);
  const boardStore = new BoardStore(initBoard);

  BoardStore.withUserStore(userStore);

  return ({
    greetStore,
    userStore,
    boardStore
  });
};
