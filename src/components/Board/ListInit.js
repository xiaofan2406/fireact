import React from 'react';
import { inject, observer } from 'mobx-react';

import ListDisplay from './ListDisplay';

@inject('boardStore')
@observer
class ListInit extends React.Component {
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
    console.log('render ListInit');

    return boardStore.loading ? (
      <p>loading</p>
    ) : (
      <ListDisplay />
    );
  }
}


export default ListInit;
