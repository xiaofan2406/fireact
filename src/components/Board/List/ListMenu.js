import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ListName from './ListName';

@inject('boardStore')
@observer
class ListMenu extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  handleKeyUp = e => {
    const { boardStore, list } = this.props;
    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newItem(e.target.value, list.id);
      e.target.value = '';
    }
  };

  changeName = () => {
    const { list } = this.props;

    list.setName('sdf');
  };

  render() {
    const { list } = this.props;
    console.log('render ListMenu');
    return (
      <div>
        <ListName list={list} />
        <input onKeyUp={this.handleKeyUp} placeholder="Name for a new item" />
        <button onClick={this.changeName}>change name</button>
      </div>
    );
  }
}

export default ListMenu;
