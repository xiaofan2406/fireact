import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';

function BoardMenu({ boardStore }) {
  console.log('render BoardMenu');

  const newList = e => {
    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newList(e.target.value.trim());
      e.target.value = '';
    }
  };

  return (
    <div>
      <input placeholder="Name for a new list" onKeyUp={newList} type="text" />
    </div>
  );
}

BoardMenu.propTypes = {
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), observer);

export default enhance(BoardMenu);
