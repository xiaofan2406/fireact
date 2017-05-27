import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { variables } from 'styles';
import 'styles/reset.css';
import 'styles/animation.css';
import 'styles/template.css';

import Brand from './Brand';
import Navigation from './Navigation';

const css = {
  Layout: {},
  header: {
    height: variables.Layout.headerHeight,
    backgroundColor: '#242729',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};

function Layout({ classes, children }) {
  return (
    <div className={classes.Layout}>
      <div className={classes.header}>
        <Brand />
        <Navigation />
      </div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withCss(css)(Layout);
