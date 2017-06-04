import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'hocs';
import withCss from 'react-jss';
import { Popover } from 'widgets';
import { spacing, theme, colors } from 'styles';
import { compose } from 'utils';
import { boardTypes } from 'constants';

const css = {
  TitleMenu: {
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

function TitleMenu({ classes, router }) {
  console.log('render TitleMenu');
  const menuItems = Object.keys(boardTypes).map(type => ({
    path: boardTypes[type],
    label: type
  }));

  const menuAction = path => () => {
    router.push(path);
  };
  return (
    <Popover
      className={classes.TitleMenu}
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
    </Popover>
  );
}

TitleMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), withRouter);

export default enhance(TitleMenu);
