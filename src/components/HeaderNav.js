import React from 'react';
import Link from 'react-router/Link';
import classnames from 'classnames';
import withLocation from 'react-router-v4-hocs/lib/withLocation';

import injectSheet, { primaryColor, headerHeight } from 'styles';
import compose from 'utils/compose';
import { routes } from 'app/router';


const styles = {
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
    borderBottom: `2px solid ${primaryColor}`
  }
};

function HeaderNav({ sheet: { classes }, location }) {
  return (
    <div className={classes.headerNav}>
      {routes.map(route => (
        <Link
          className={classnames({
            [classes.link]: true,
            [classes.linkActive]: route.pattern === location.pathname
          })}
          key={route.pattern}
          to={route.pattern}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
}

HeaderNav.propTypes = {
  sheet: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired
};


const enhance = compose(
  withLocation,
  injectSheet(styles)
);

export default enhance(HeaderNav);
