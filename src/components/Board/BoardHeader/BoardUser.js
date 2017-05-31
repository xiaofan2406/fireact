import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { spacing, theme, colors } from 'styles';
import { Popover } from 'widgets';

const css = {
  BoardUser: {
    padding: [0, spacing.internalBreath]
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

function BoardUser({ classes }) {
  const menuItems = [
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
    { path: '/logout', label: 'Logout' }
  ];

  return (
    <div className={classes.BoardUser}>
      <Popover
        className={classes.popover}
        label="User"
        align="left"
        direction="bottom"
      >
        <div className={classes.menu}>
          {menuItems.map(item => (
            <span
              key={item.path}
              onClick={() => {
                console.log(item.path);
              }}
              className={classes.menuItem}
            >
              {item.label}
            </span>
          ))}
        </div>
      </Popover>
    </div>
  );
}

BoardUser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCss(css)(BoardUser);
