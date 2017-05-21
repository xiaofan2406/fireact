import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import checkImage from 'assets/check.png';
import classnames from 'classnames';

// TODO animations

const css = {
  wrapper: {
    display: 'inline-block',
    border: '1px solid #eeeeee',
    width: ({ size }) => size,
    height: ({ size }) => size,
    backgroundSize: ({ size }) => `${size - 2}px ${size - 2}px`,
    backgroundPosition: '1px 1px',
    backgroundRepeat: 'no-repeat',

    '&.checked': {
      border: 'none',
      backgroundImage: `url(${checkImage})`,
      backgroundColor: '#0070E0'
    }
  }
};

@withCss(css)
class Checkbox extends React.Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,
    onUncheck: PropTypes.func.isRequired,
    size: PropTypes.number
  };

  static defaultProps = {
    size: 14
  };

  handleClick = () => {
    if (this.props.checked) {
      this.props.onUncheck();
    } else {
      this.props.onCheck();
    }
  };

  render() {
    const { sheet, classes, checked, onCheck, onUncheck, ...rest } = this.props;
    const classNames = classnames({
      [classes.wrapper]: true,
      checked
    });
    return <div className={classNames} onClick={this.handleClick} {...rest} />;
  }
}

export default Checkbox;
