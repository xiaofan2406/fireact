import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Loader } from 'widgets';

import BoardLists from './BoardLists';

@inject('boardStore')
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { boardStore } = this.props;
    boardStore.initialSync();
  }

  render() {
    const { boardStore } = this.props;
    console.log('render BoardDisplay');

    return boardStore.isLoading ? <Loader color="#c8dbfe" /> : <BoardLists />;
  }
}

export default BoardDisplay;
