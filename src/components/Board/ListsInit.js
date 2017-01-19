import React from 'react';
import { inject, observer } from 'mobx-react';

import Lists from './Lists';

@inject('boardStore')
@observer
class ListsInit extends React.Component {
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
    console.log('render ListsInit');

    return boardStore.loading ? (
      <p>loading</p>
    ) : (
      <Lists />
    );
  }
}


export default ListsInit;
