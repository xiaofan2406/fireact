import { autorun } from 'mobx';

import UserStore from './user-store';
import BoardStore from './board-store';

export default function createStore(initialState) {
  const initUser = initialState.userStore || {};
  const initBoard = initialState.boardStore || {};

  const userStore = new UserStore();
  userStore.login(initUser);

  const boardStore = new BoardStore(initBoard);
  BoardStore.injectStore({ userStore });

  autorun(() => userStore.isAuthed && boardStore.initialSync());

  return {
    userStore,
    boardStore
  };
}
