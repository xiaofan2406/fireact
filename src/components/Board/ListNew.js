import React from 'react';
import { inject } from 'mobx-react';

@inject('boardStore')
class ListNew extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  newList = (e) => {
    const { boardStore } = this.props;

    if (e.which === 27) {
      console.log('est');
    } else if (e.which === 13) {
      console.log('enter');
      boardStore.addList(e.target.value);
    }
  }

  render() {
    return (
      <div>
        <input onKeyUp={this.newList} type="text" placeholder="enter a name here" />
      </div>
    );
  }
}


export default ListNew;
