import React from 'react';
import PropTypes from 'prop-types';
import styled, { cx } from 'react-emotion';
import checkImage from 'assets/check.png';

const Container = styled.div`
  display: inline-block;
  border: 1px solid #eeeeee;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-size: ${({ size }) => `${size - 2}px ${size - 2}px`};
  background-position: 1px 1px;
  background-repeat: no-repeat;
  background-color: #ffffff;
  &.checked {
    border: none;
    background-image: url(${checkImage});
    background-color: #0070e0;
  }
`;

const Checkbox = ({ checked, onToggle, ...rest }) => (
  <Container
    {...rest}
    className={cx(rest.className, { checked })}
    onClick={onToggle}
  />
);

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  size: PropTypes.number,
};

Checkbox.defaultProps = {
  size: 14,
};

export default Checkbox;
