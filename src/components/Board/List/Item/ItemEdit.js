import React from 'react';
import PropTypes from 'prop-types';

class ItemEdit extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onKeyUp: PropTypes.func.isRequired
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

  render() {
    const { item, onKeyUp } = this.props;
    return (
      <div tabIndex={0} role="button" ref={this.containerRef} onKeyUp={onKeyUp}>
        editing item: {item.title}
      </div>
    );
  }
}

export default ItemEdit;
