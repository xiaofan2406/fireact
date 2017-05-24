import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import checkImage from 'assets/check.png';
import classnames from 'classnames';

// TODO animations
const css = {
  Checkbox: {
    display: 'inline-block',
    border: '1px solid #eeeeee',
    width: ({ size }) => size,
    height: ({ size }) => size,
    backgroundSize: ({ size }) => `${size - 2}px ${size - 2}px`,
    backgroundPosition: '1px 1px',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff',
    '&.checked': {
      border: 'none',
      backgroundImage: `url(${checkImage})`,
      backgroundColor: '#0070E0'
    }
  }
};

function Checkbox({ sheet, classes, checked, onToggle, ...rest }) {
  const classNames = classnames(classes.Checkbox, rest.className, {
    checked
  });
  return <div {...rest} className={classNames} onClick={onToggle} />;
}

Checkbox.propTypes = {
  sheet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.number
};

Checkbox.defaultProps = {
  size: 14
};

export default withCss(css)(Checkbox);
