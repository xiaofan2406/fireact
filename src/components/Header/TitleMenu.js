import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { withRouter } from 'hocs';
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

function TitleMenu({ classes, isSyncing, router }) {
  console.log('render TitleMenu');
  const menuItems = Object.keys(boardTypes).map(type => ({
    path: boardTypes[type],
    label: type
  }));

  const menuAction = path => () => {
    router.push(path);
  };
  return (
    <div className={classes.TitleMenu}>
      {isSyncing
        ? <Loader className={classes.loader} color={colors.teal500} size={24} />
        : <Popover
            className={classes.popover}
            label="Board"
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
                  {item.label}
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
  router: PropTypes.object.isRequired
};

const enhance = compose(
  inject(stores => ({
    isSyncing: stores.boardStore.isSyncing
  })),
  withCss(css),
  withRouter
);

export default enhance(TitleMenu);
