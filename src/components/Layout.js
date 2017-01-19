import React from 'react';
import injectSheet, { fontFamily, fontSize } from 'styles';
import 'styles/reset.css';
import 'styles/animation.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';


const styles = {
  layout: {
    fontFamily,
    fontSize
  },
  main: {
    padding: '1em'
  }
};

/* Use functions rather than constant elements for better debugging */
function Layout({ sheet: { classes }, children }) {
  return (
    <MuiThemeProvider>
      <div className={classes.layout}>
        <Header />
        <div className={classes.main}>
          {children}
        </div>
      </div>
    </MuiThemeProvider>
  );
}

Layout.propTypes = {
  sheet: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
};


export default injectSheet(styles)(Layout);
