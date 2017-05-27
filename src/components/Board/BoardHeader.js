import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose, keyCodes } from 'utils';
import withCss from 'react-jss';
import { variables } from 'styles';

const css = {
  BoardHeader: {
    height: variables.BoardHeader.height
  }
};

function BoardHeader({ classes, boardStore }) {
  console.log('render BoardHeader');

  const newList = e => {
    if (e.which === keyCodes.ESC) {
      e.target.value = '';
    } else if (e.which === keyCodes.ENTER) {
      boardStore.newList(e.target.value.trim());
      e.target.value = '';
    }
  };

  return (
    <div className={classes.BoardHeader}>
      <input placeholder="Name for a new list" onKeyUp={newList} type="text" />
    </div>
  );
}

BoardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(BoardHeader);
