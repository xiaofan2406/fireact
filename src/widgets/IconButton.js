import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';
import { spacing, colors } from 'styles';

const css = {
  IconButton: {
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: `${spacing.internal}px calc(${spacing.unit}px + 1em) ${spacing.internal}px calc(${spacing.unit}px + 1em)`,
    borderRadius: 4,
    lineHeight: 1.2,
    minWidth: 32,
    fontSize: ({ size }) => size,
    margin: [spacing.unit, spacing.external],
    outline: 'none',
    '&:hover': {
      backgroundColor: colors.grey100
    },
    '&:active': {
      outline: 'none',
      boxShadow: `inset 0 1px 6px ${colors.grey300}`
    }
  }
};

function IconButton({ sheet, classes, iconName, ...rest }) {
  const classNames = classnames(classes.IconButton, rest.className);

  return (
    <button {...rest} className={classNames}>
      <i className={`fa fa-${iconName}`} aria-hidden="true" />
    </button>
  );
}

IconButton.propTypes = {
  sheet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number
};

IconButton.defaultProps = {
  size: 14
};

export default withCss(css)(IconButton);
