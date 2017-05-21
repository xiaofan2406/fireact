import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ItemDisplay from './ItemDisplay';
import ItemEdit from './ItemEdit';

@inject('boardStore')
@observer
class Item extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  handleDisplayFocus = () => {
    if (this.props.item.isSelected) {
      this.props.item.setSelectionStatus(false);
    } else {
      this.props.boardStore.selectOnlyItem(this.props.item.id);
    }
  };

  handleEditKeyUp = event => {
    console.log('handleEditKeyUp');
    if (
      (event.which === 27 || event.which === 13) &&
      this.props.item.isEditing
    ) {
      this.props.item.setEditingStatus(false);
    }
  };

  render() {
    const { item } = this.props;

    console.log('render Item', item.title);
    console.log(item.isSelected);
    return item.isEditing
      ? <ItemEdit item={item} onKeyUp={this.handleEditKeyUp} />
      : <ItemDisplay item={item} onFocus={this.handleDisplayFocus} />;
  }
}

export default Item;
