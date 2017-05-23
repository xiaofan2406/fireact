import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import ItemContent from './ItemContent';

@inject('viewStore')
@observer
class ItemName extends React.Component {
  static propTypes = {
    viewStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  inputRef = ref => {
    this.input = ref;
  };

  handleKeyUp = event => {
    const { viewStore, item } = this.props;
    if (event.which === 27 || event.which === 13) {
      this.props.item.setName(this.input.value.trim());
      viewStore.finishEditingItem(item.uuid);
    }
  };

  handleBlur = () => {
    this.props.item.setName(this.input.value.trim());
  };

  render() {
    const { viewStore, item } = this.props;
    console.log('render ItemName');
    return viewStore.editingItemId === item.uuid
      ? <input
          tabIndex={0}
          defaultValue={item.name}
          ref={this.inputRef}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          placeholder="New To-Do"
        />
      : <ItemContent item={item} />;
  }
}

export default ItemName;
