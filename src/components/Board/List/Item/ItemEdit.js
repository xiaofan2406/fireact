import React from 'react';
import PropTypes from 'prop-types';

class ItemEdit extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.container.focus();
  }

  componentWillUnmount() {
    this.container.blur();
  }

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
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
    return (
      <div
        tabIndex={0}
        role="button"
        ref={this.containerRef}
        onKeyUp={this.handleKeyUp}
      >
        editing item: {item.title}
      </div>
    );
  }
}

export default ItemEdit;
