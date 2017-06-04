import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { Loader } from 'widgets';

function Syncing({ isSyncing }) {
  return isSyncing ? <Loader color="#c8dbfe" size={24} /> : null;
}

Syncing.propTypes = {
  isSyncing: PropTypes.bool.isRequired
};

export default inject(stores => ({
  isSyncing: stores.boardStore.isSyncing
}))(Syncing);
