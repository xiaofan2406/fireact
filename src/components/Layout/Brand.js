import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import logo from 'assets/logo.svg';

const css = {
  Brand: {
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    animation: 'spin infinite 10s linear',
    height: '34px'
  },
  title: {
    animation: 'fadeIn 2s ease',
    fontSize: 18,
    color: '#FFFFFF'
  }
};

@withCss(css)
class Brand extends React.PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.Brand}>
        <img src={logo} className={classes.logo} alt="logo" />
        <span className={classes.title}>
          Fireact
        </span>
      </div>
    );
  }
}

export default Brand;
