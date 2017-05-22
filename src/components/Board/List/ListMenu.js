import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

@inject('boardStore')
@observer
class ListMenu extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  handleAddClick = () => {
    const { boardStore, list } = this.props;
    boardStore.newItem(list.id);
  };

  handleRemoveClick = () => {
    const { boardStore, list } = this.props;
    // TODO replace confirm with a custom alert service
    // if (confirm('Are you sure you want to delete the whole list?')) {
    boardStore.removeList(list.id);
    // TODO create a `inbox` list for items with no list
    // }
  };

  render() {
    console.log('render ListMenu');
    return (
      <div>
        <button onClick={this.handleAddClick}>+</button>
        <button onClick={this.handleRemoveClick}>X</button>
      </div>
    );
  }
}

export default ListMenu;
