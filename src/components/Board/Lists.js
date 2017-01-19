import React from 'react';
import { inject, observer } from 'mobx-react';
import { Row } from 'antd';

import ListSingle from './ListSingle';

@inject('boardStore')
@observer
class Lists extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  get = () => {}

  render() {
    const { boardStore } = this.props;
    console.log('render Lists');

    return boardStore.isEmpty ? (
      <p>nothing here</p>
    ) : (
      <Row gutter={12}>
        {boardStore.lists.keys().map(key => (
          <ListSingle id={key} key={key} />
        ))}
      </Row>
    );
  }
}


export default Lists;
