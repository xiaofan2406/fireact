import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { colors, headerHeight } from 'styles';
import { SmartLink } from 'widgets';

import logo from './logo.svg';
import { routes } from '../router';

const css = {
  Header: {
    height: headerHeight,
    backgroundColor: '#242729',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  brand: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    animation: 'spin infinite 10s linear',
    height: '34px'
  },
  title: {
    animation: 'fadeIn 2s ease',
    fontSize: '18px',
    color: '#fff'
  },
  headerNav: {
    height: headerHeight
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0 0.5em',
    display: 'inline-block',
    lineHeight: headerHeight,
    height: headerHeight,
    '&:hover': {
      backgroundColor: '#3b4045'
    }
  },
  linkActive: {
    borderBottom: `2px solid ${colors.primary}`
  }
};

function Header({ classes }) {
  console.log('render Header');
  const nav = routes.map(route => (
    <SmartLink
      className={classes.link}
      activeClassName={classes.linkActive}
      key={route.path}
      to={route.path}
    >
      {route.name}
    </SmartLink>
  ));
  return (
    <div className={classes.Header}>
      <div className={classes.brand}>
        <img src={logo} className={classes.logo} alt="logo" />
        <span className={classes.title}>Fireact</span>
      </div>
      <div className={classes.headerNav}>{nav}</div>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCss(css)(Header);
