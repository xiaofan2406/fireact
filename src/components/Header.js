import React from 'react';
import injectSheet, { headerHeight } from 'styles';

import logo from './logo.svg';
import HeaderNav from './HeaderNav';


const styles = {
  header: {
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
  }
};

function Header({ sheet: { classes } }) {
  return (
    <div className={classes.header}>
      <div className={classes.brand}>
        <img src={logo} className={classes.logo} alt="logo" />
        <span className={classes.title}>Fireact</span>
      </div>
      <HeaderNav />
    </div>
  );
}

Header.propTypes = {
  sheet: React.PropTypes.object.isRequired
};


export default injectSheet(styles)(Header);
