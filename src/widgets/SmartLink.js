import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import classnames from 'classnames';

function SmarkLink({ activeClassName, location, ...rest }) {
  return (
    <Link
      className={classnames({
        [rest.className]: rest.className,
        [activeClassName]: rest.to === location.pathname
      })}
      to={rest.to}
      replace={rest.replace}
    >
      {rest.children}
    </Link>
  );
}

SmarkLink.propTypes = {
  location: PropTypes.object.isRequired,
  activeClassName: PropTypes.string
};

SmarkLink.defaultProps = {
  activeClassName: null
};

export default withRouter(SmarkLink);
