import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import withCss from 'react-jss';
import { spacing, theme, colors, variables } from 'styles';
import { IconButton } from 'widgets';

import TitleMenu from './TitleMenu';
import Syncing from './Syncing';
import UserMenu from './UserMenu';

const css = {
  Header: {
    height: variables.BoardHeader.height,
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
  }
};

function Header({ classes, boardStore }) {
  console.log('render Header');

  const handleClick = () => {
    boardStore.newItem();
  };
  // TODO break this down
  return (
    <div className={classes.Header}>
      <Syncing />
      <TitleMenu />
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
      <UserMenu />
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(Header);
