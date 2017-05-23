import React from 'react';
import PropTypes from 'prop-types';

class ItemEditName extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.input.focus();
  }

  inputRef = ref => {
    this.input = ref;
  };

  handleKeyUp = event => {
    if (
      (event.which === 27 || event.which === 13) &&
      this.props.item.isEditing
    ) {
      this.props.item.setName(this.input.value.trim());
      this.props.item.setEditingStatus(false);
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
