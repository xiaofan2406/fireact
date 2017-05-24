import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import classnames from 'classnames';
import BoardMenu from './BoardMenu';
import BoardDisplay from './BoardDisplay';
import BoardSyncing from './BoardSyncing';

const css = {
  Board: {
    backgroundColor: '#ffffff',
    height: '100%',
    '&.isEditing': {
      backgroundColor: 'rgb(249, 249, 249)'
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
      <BoardMenu />
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
