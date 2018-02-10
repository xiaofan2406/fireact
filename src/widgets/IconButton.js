import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { spacing, colors } from 'styles';

const Button = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  padding: ${spacing.internal}px calc(${spacing.unit}px + 1em)
    ${spacing.internal}px calc(${spacing.unit}px + 1em);
  border-radius: 4px;
  line-height: 1.2;
  min-width: 32px;
  font-size: ${({ size }) => size}px;
  margin: ${spacing.unit}px ${spacing.external}px;
  outline: none;
  &:hover {
    background-color: ${colors.grey100};
  }
  &:active {
    outline: none;
    box-shadow: inset 0 1px 6px ${colors.grey300};
  }
`;

const IconButton = ({ iconName, ...rest }) => (
  <Button {...rest}>
    <i className={`fa fa-${iconName}`} aria-hidden="true" />
  </Button>
);

IconButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  size: PropTypes.number,
};

IconButton.defaultProps = {
  size: 14,
};

export default IconButton;
