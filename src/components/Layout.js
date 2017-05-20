import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import 'styles/reset.css';
import 'styles/animation.css';
import 'styles/template.css';
import Header from './Header';

const css = {
  main: {
    padding: '1em'
  }
};

/* Use functions rather than constant elements for better debugging */
function Layout({ classes, children }) {
  return (
    <div>
      <Header />
      <div className={classes.main}>
        {children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default withCss(css)(Layout);
