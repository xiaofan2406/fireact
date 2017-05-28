import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import { spacing, theme, colors } from 'styles';
import { IconButton } from 'widgets';

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
    fontSize: theme.headingSize
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
  const handleMouseDown = () => {
    boardStore.reselectList();
  };
  const handleMouseUp = () => {
    boardStore.newItem();
  };

  return (
    <div className={classes.BoardHeader}>
      <span className={classes.title}>Board</span>
      <div className={classes.menu}>
        <IconButton
          onClick={boardStore.newList}
          className={classes.icon}
          iconName="plus"
          title="New List"
        />
        <IconButton
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
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
