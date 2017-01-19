import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('boardStore')
@observer
class ListMenu extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired
  };

  handleKeyUp = (e) => {
    const { boardStore, list } = this.props;
    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newItem(e.target.value, list.id);
      e.target.value = '';
    }
  }
  changeTitle = () => {
    const { list } = this.props;

    list.setTitle('sdf');
  }

  render() {
    return (
      <div>
        <input onKeyUp={this.handleKeyUp} placeholder="Name for a new item" />
        <button onClick={this.changeTitle} >change title</button>
      </div>
    );
  }
}


export default ListMenu;
