import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Loader } from 'widgets';
import withCss from 'react-jss';
import { compose } from 'utils';
import { colors, variables } from 'styles';

import BoardListsEmpty from './BoardListsEmpty';

const css = {
  BoardStatus: {
    position: 'absolute',
    width: variables.BoardStatus.width,
    height: variables.BoardStatus.height,
    top: '35%',
    left: `calc((100% - ${variables.BoardStatus.width}px)/2)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

function BoardStatus({ classes, boardStore }) {
  console.log('render BoardStatus');

  const emptyStatus = boardStore.isEmpty ? <BoardListsEmpty /> : null;

  return (
    <div className={classes.BoardStatus}>
      {boardStore.isLoading ? <Loader color={colors.teal500} /> : emptyStatus}
    </div>
  );
}

BoardStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(BoardStatus);
