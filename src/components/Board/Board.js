import React from 'react';
import BoardMenu from './BoardMenu';
import BoardDisplay from './BoardDisplay';
import BoardSyncing from './BoardSyncing';

function Board() {
  return (
    <div>
      <BoardSyncing />
      <BoardMenu />
      <BoardDisplay />
    </div>
  );
}

export default Board;
