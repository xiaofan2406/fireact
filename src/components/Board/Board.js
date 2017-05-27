import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import classnames from 'classnames';
import { colors, variables } from 'styles';

import BoardHeader from './BoardHeader';
import BoardDisplay from './BoardDisplay';
import BoardSyncing from './BoardSyncing';

const css = {
  Board: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    minHeight: `calc(100vh - ${variables.Layout.headerHeight}px)`,
    '&.isEditing': {
      backgroundColor: colors.grey50
    }
  }
};

function Board({ classes, viewStore }) {
  console.log('render Board');
  const classNames = classnames({
    [classes.Board]: true,
    isEditing: viewStore.isInEditMode
  });
  return (
    <div className={classNames}>
      <BoardSyncing />
      <BoardHeader />
      <BoardDisplay />
    </div>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  viewStore: PropTypes.object.isRequired
};

const enhance = compose(inject('viewStore'), withCss(css), observer);

export default enhance(Board);
