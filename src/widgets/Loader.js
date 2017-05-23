// from: https://github.com/yuanyan/halogen/blob/master/src/RingLoader.js
import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';

const css = {
  container: {},
  outer: {
    width: ({ size }) => `${size}px`,
    height: ({ size }) => `${size}px`,
    position: 'relative'
  },
  withAnimation: {
    perspective: '800px',
    animationFillMode: 'forwards'
  },
  innerFirst: {
    width: ({ size }) => `${size}px`,
    height: ({ size }) => `${size}px`,
    border: ({ size, color }) => `${size / 10}px solid ${color}`,
    opacity: 0.4,
    borderRadius: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    extend: 'withAnimation',
    animation: 'loaderRigthRotate 2s 0s infinite linear'
  },
  innerSecond: {
    width: ({ size }) => `${size}px`,
    height: ({ size }) => `${size}px`,
    border: ({ size, color }) => `${size / 10}px solid ${color}`,
    opacity: 0.4,
    borderRadius: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    extend: 'withAnimation',
    animation: 'loaderLeftRotate 2s 0s infinite linear'
  }
};

class Loader extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string, // eslint-disable-line
    size: PropTypes.number // eslint-disable-line
  };
  static defaultProps = {
    color: '#ffffff',
    size: 60
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <div className={classes.outer}>
          <div className={classes.innerFirst} />
          <div className={classes.innerSecond} />
        </div>
      </div>
    );
  }
}

export default withCss(css)(Loader);
