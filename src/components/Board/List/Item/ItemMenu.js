import React from 'react';
import PropTypes from 'prop-types';

class ItemMenu extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  changeName = () => {
    const { item } = this.props;
    item.setTitle('a new title');
  };

  render() {
    return <div><button onClick={this.changeName}>click me</button></div>;
  }
}

export default ItemMenu;
