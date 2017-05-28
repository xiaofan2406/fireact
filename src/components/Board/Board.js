import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import classnames from 'classnames';
import { colors, variables } from 'styles';

import BoardSyncing from './BoardSyncing';
import BoardHeader from './BoardHeader';
import BoardDisplay from './BoardDisplay';
import BoardEvents from './BoardEvents';

const css = {
  Board: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    minHeight: `calc(100vh - ${variables.Layout.headerHeight}px)`,
    '&.isEditing': {
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
      <BoardSyncing />
      <BoardHeader />
      <BoardDisplay />
      <BoardEvents />
    </div>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(Board);
