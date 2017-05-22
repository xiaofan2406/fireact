import React from 'react';
import { inject } from 'mobx-react';
import { Loader } from 'widgets';

// eslint-disable-next-line
function BoardSyncing({ isSyncing }) {
  return <Loader loading={isSyncing} color="#c8dbfe" />;
}

export default inject(stores => ({
  isLoading: stores.boardStore.isSyncing
}))(BoardSyncing);
