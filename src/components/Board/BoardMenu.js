import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

@inject('boardStore')
class BoardMenu extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired
  };

  newList = e => {
    const { boardStore } = this.props;

    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newList(e.target.value.trim());
      e.target.value = '';
    }
  };

  render() {
    return (
      <div>
        <input
          placeholder="Name for a new list"
          onKeyUp={this.newList}
          type="text"
        />
      </div>
    );
  }
}

export default BoardMenu;
