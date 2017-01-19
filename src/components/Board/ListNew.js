import React from 'react';
import { inject } from 'mobx-react';

import { Input } from 'antd';

@inject('boardStore')
class ListNew extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  newList = (e) => {
    const { boardStore } = this.props;

    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newList(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <Input onKeyUp={this.newList} type="text" placeholder="enter a name here" />
      </div>
    );
  }
}


export default ListNew;
