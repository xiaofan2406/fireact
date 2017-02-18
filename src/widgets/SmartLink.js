import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import withLocation from 'hocs/withLocation';

function SmarkLink({ activeClassName, className, location, ...rest }) {
  return (
    <Link
      className={classnames({
        [className]: true,
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
  location: React.PropTypes.object.isRequired,
  className: React.PropTypes.string,
  activeClassName: React.PropTypes.string
};

SmarkLink.defaultProps = {
  className: null,
  activeClassName: null
};

export default withLocation(SmarkLink);
