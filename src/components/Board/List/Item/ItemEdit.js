import React from 'react';
import PropTypes from 'prop-types';

class ItemEdit extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onKeyUp: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.containerRef.focus();
  }
  componentWillUnmount() {
    console.log('gonna blur it');
    this.containerRef.blur();
  }

  render() {
    const { item, onKeyUp } = this.props;
    return (
      <div
        tabIndex={0}
        role="button"
        ref={ref => {
          this.containerRef = ref;
        }}
        onKeyUp={onKeyUp}
      >
        editing item: {item.title}
      </div>
    );
  }
}

export default ItemEdit;
