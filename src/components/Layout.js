import React from 'react';
import PropTypes from 'prop-types';
import 'styles/reset.css';
import 'styles/animation.css';
import 'styles/template.css';
import Header from './Header';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
