import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { spacing, theme, variables } from 'styles';

import ActionMenu from './ActionMenu';
import TitleMenu from './TitleMenu';
import UserMenu from './UserMenu';

const css = {
  Header: {
    height: variables.Header.height,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: theme.border,
    boxShadow: theme.boxShadow,
    padding: [spacing.internal, spacing.internalBreath],
  },
};

function Header({ classes }) {
  console.log('render Header');
  return (
    <div className={classes.Header}>
      <TitleMenu />
      <ActionMenu />
      <UserMenu />
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withCss(css)(Header);
