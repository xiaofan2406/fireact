import React from 'react';
import PropTypes from 'prop-types';

class ItemEdit extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.input.focus();
  }

  inputRef = ref => {
    this.input = ref;
  };

  handleInputKeyUp = event => {
    if (
      (event.which === 27 || event.which === 13) &&
      this.props.item.isEditing
    ) {
      this.props.item.setEditingStatus(false);
    }
  };

  handleDivKeyPress = event => {
    if (event.which === 27 && this.props.item.isEditing) {
      this.props.item.setEditingStatus(false);
    }
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        <input
          tabIndex={0}
          defaultValue={item.name}
          ref={this.inputRef}
          onKeyUp={this.handleInputKeyUp}
        />
        <div
          contentEditable
          tabIndex={0}
          role="button"
          suppressContentEditableWarning
          onKeyUp={this.handleDivKeyPress}
        >
          {item.description}
        </div>
      </div>
    );
  }
}

export default ItemEdit;
