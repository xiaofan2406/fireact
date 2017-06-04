import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import classnames from 'classnames';
import { colors } from 'styles';

import Header from './Header';
import Display from './Display';
import Events from './Events';

const css = {
  Board: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    minHeight: '100vh',
    '&.isEditing': {
      transition: 'background-color, 0.2s',
      backgroundColor: colors.grey100
    }
  }
};

function Board({ classes, boardStore }) {
  console.log('render Board');
  const classNames = classnames({
    [classes.Board]: true,
    isEditing: boardStore.isEditingItem
  });
  return (
    <div className={classNames}>
      <Header />
      <Display />
      <Events />
    </div>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(Board);
