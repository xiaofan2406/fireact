import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { variables } from 'styles';
import 'styles/reset.css';
import 'styles/animation.css';
import 'styles/template.css';

const cssClass = css`
  min-width: ${variables.Layout.minWidth}px;
  min-height: ${variables.Layout.minHeight}px;
`;

const Layout = ({ children }) => <div className={cssClass}>{children}</div>;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
