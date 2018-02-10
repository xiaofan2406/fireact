import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { variables } from 'styles';
import 'styles/reset.css';
import 'styles/animation.css';
import 'styles/template.css';

const css = {
  Layout: {
    minWidth: variables.Layout.minWidth,
    minHeight: variables.Layout.minHeight,
  },
};

function Layout({ classes, children }) {
  return <div className={classes.Layout}>{children}</div>;
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withCss(css)(Layout);
