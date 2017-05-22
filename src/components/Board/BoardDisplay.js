import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

import BoardLists from './BoardLists';

@inject('boardStore')
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { boardStore } = this.props;
    boardStore.initialSync();
  }

  render() {
    const { boardStore } = this.props;
    console.log('render BoardDisplay');

    return boardStore.loading ? <p>loading</p> : <BoardLists />;
  }
}

export default BoardDisplay;
