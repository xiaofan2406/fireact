import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing, variables } from 'styles';

import List from './List';

const css = {
  BoardLists: {
    padding: spacing.internalBreath,
    height: `calc(100vh - ${variables.BoardHeader.height}px)`,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 10,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 100
    },
    '&::-webkit-scrollbar:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.09)'
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 100,
      backgroundClip: 'padding-box',
      border: '2px solid rgba(0, 0, 0, 0)',
      minHeight: 10
    },
    '&::-webkit-scrollbar-thumb:vertical:active': {
      background: 'rgba(0, 0, 0, 0.61)',
      borderRadius: 100
    }
  }
};

function BoardLists({ classes, boardStore }) {
  console.log('render BoardLists');
  return (
    <div className={classes.BoardLists}>
      {boardStore.availableLists.map(list => (
        <List list={list} key={list.id} />
      ))}
    </div>
  );
}

BoardLists.propTypes = {
  boardStore: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), inject('boardStore'), observer);

export default enhance(BoardLists);
