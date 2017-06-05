import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import withCss from 'react-jss';
import { Popover, Loader } from 'widgets';
import { spacing, theme, colors, variables } from 'styles';
import { compose } from 'utils';
import { boardTypes } from 'constants';

const css = {
  TitleMenu: {
    width: variables.Header.titleMenuWidth
  },
  loader: {
    padding: [spacing.internal, spacing.internalBreath]
  },
  popover: {
    userSelect: 'none',
    cursor: 'default',
    padding: [spacing.internal, spacing.internalBreath],
    '&:active, &:focus, &:hover': {
      backgroundColor: colors.grey200,
      color: colors.black
    }
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: spacing.unit,
    padding: [spacing.internal, spacing.internal],
    borderRadius: spacing.unit,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: colors.white
  },
  menuItem: {
    cursor: 'default',
    borderRadius: spacing.unit,
    padding: [spacing.internal, spacing.internalBreath],
    display: 'flex',
    '&:hover': {
      backgroundColor: theme.primaryColor
    }
  }
};

function TitleMenu({ classes, isSyncing, history, location }) {
  console.log('render TitleMenu');
  const menuItems = Object.values(boardTypes);

  const menuAction = path => () => {
    history.push(path);
  };

  const title = Object.values(boardTypes).find(
    type => type.path === location.pathname
  ).name;

  return (
    <div className={classes.TitleMenu}>
      {isSyncing
        ? <Loader className={classes.loader} color={colors.teal500} size={24} />
        : <Popover
            className={classes.popover}
            label={title}
            align="left"
            direction="bottom"
          >
            <div className={classes.menu}>
              {menuItems.map(item =>
                <span
                  key={item.path}
                  onClick={menuAction(item.path)}
                  className={classes.menuItem}
                >
                  {item.name}
                </span>
              )}
            </div>
          </Popover>}
    </div>
  );
}

TitleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

const enhance = compose(
  inject(stores => ({
    isSyncing: stores.boardStore.isSyncing
  })),
  withCss(css),
  withRouter
);

export default enhance(TitleMenu);
