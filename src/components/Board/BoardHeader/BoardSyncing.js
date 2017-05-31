import React from 'react';
import { inject } from 'mobx-react';
import { Loader } from 'widgets';

// eslint-disable-next-line
function BoardSyncing({ isSyncing }) {
  return isSyncing ? <Loader color="#c8dbfe" size={24} /> : null;
}

export default inject(stores => ({
  isSyncing: stores.boardStore.isSyncing
}))(BoardSyncing);
