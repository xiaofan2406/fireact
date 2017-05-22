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
    loading: PropTypes.bool,
    color: PropTypes.string, // eslint-disable-line
    size: PropTypes.number // eslint-disable-line
  };
  static defaultProps = {
    loading: true,
    color: '#ffffff',
    size: 60
  };
  render() {
    const { classes, loading } = this.props;
    return loading
      ? <div className={classes.container}>
          <div className={classes.outer}>
            <div className={classes.innerFirst} />
            <div className={classes.innerSecond} />
          </div>
        </div>
      : null;
  }
}

export default withCss(css)(Loader);
