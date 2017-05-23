import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('viewStore')
class ItemEditName extends React.Component {
  static propTypes = {
    viewStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.input.focus();
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
    const { item } = this.props;
    console.log('render ItemEditName');
    return (
      <input
        tabIndex={0}
        defaultValue={item.name}
        ref={this.inputRef}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        placeholder="New To-Do"
      />
    );
  }
}

export default ItemEditName;
