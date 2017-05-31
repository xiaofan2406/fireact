import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import { spacing, theme, colors } from 'styles';
import { IconButton } from 'widgets';

import BoardSyncing from './BoardSyncing';

const css = {
  BoardHeader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: theme.border,
    boxShadow: theme.boxShadow,
    padding: [spacing.internal, spacing.internalBreath]
  },
  title: {
    padding: [0, spacing.internalBreath],
    fontSize: theme.headingSize,
    display: 'flex',
    alignItems: 'center'
  },
  name: {
    marginRight: spacing.external
  },
  menu: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    color: colors.grey700
  },
  user: {
    padding: [0, spacing.internalBreath]
  }
};

function BoardHeader({ classes, boardStore }) {
  console.log('render BoardHeader');

  const handleClick = () => {
    boardStore.newItem();
  };
  // TODO break this down
  return (
    <div className={classes.BoardHeader}>
      <span className={classes.title}>
        <span className={classes.name}>Board</span>
        <BoardSyncing />
      </span>
      <div className={classes.menu}>
        <IconButton
          onClick={boardStore.newList}
          className={classes.icon}
          iconName="plus"
          title="New List"
        />
        <IconButton
          onClick={handleClick}
          className={classes.icon}
          iconName="plus-square"
          title="New Item"
        />
      </div>
      <div className={classes.user}>user info </div>
    </div>
  );
}

BoardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(BoardHeader);
