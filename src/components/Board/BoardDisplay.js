import React from 'react';
import { inject, observer } from 'mobx-react';

import BoardLists from './BoardLists';

@inject('boardStore')
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { boardStore } = this.props;
    if (boardStore.isEmpty) {
      boardStore.initialLoad();
    }
  }

  render() {
    const { boardStore } = this.props;
    console.log('render BoardDisplay');

    return boardStore.loading ? (
      // TODO loading
      <p>loading</p>
    ) : (
      <BoardLists />
    );
  }
}


export default BoardDisplay;
