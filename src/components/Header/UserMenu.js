import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'hocs';
import withCss from 'react-jss';
import { spacing, theme, colors } from 'styles';
import { Popover } from 'widgets';
import { compose } from 'utils';

const css = {
  UserMenu: {
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

function UserMenu({ classes, router }) {
  const menuItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
    { path: '/logout', label: 'Logout' }
  ];

  const menuAction = path => () => {
    router.push(path);
  };

  return (
    <Popover
      className={classes.UserMenu}
      label="User"
      align="right"
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
    </Popover>
  );
}

UserMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), withRouter);

export default enhance(UserMenu);
