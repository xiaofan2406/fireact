import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';

const css = {
  Popover: {
    position: 'relative',
    outline: 'none',
    display: 'flex'
  },
  right: {
    right: 0,
    left: 'auto',
    position: 'absolute'
  },
  left: {
    left: 0,
    right: 'auto',
    position: 'absolute'
  }
};

@withCss(css)
class Popover extends React.Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
    children: PropTypes.node.isRequired,
    align: PropTypes.oneOf(['left', 'right']),
    direction: PropTypes.oneOf(['top', 'bottom']),
    zIndex: PropTypes.number
  };

  static defaultProps = {
    align: 'right',
    direction: 'top',
    zIndex: 2
  };

  state = {
    isVisible: false
  };

  componentDidUpdate() {
    if (this.state.isVisible) {
      document.addEventListener('click', this.handleOutsideClick);
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  getStyles = () => {
    const { direction, zIndex } = this.props;
    return direction === 'bottom'
      ? { top: this.container.offsetHeight, zIndex }
      : { bottom: this.container.offsetHeight, zIndex };
  };

  hide = () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false
      });
    }
  };

  show = () => {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true
      });
    }
  };

  handleOutsideClick = event => {
    if (this.container && !this.container.contains(event.target)) {
      this.hide();
    }
  };

  containerRef = ref => {
    this.container = ref;
  };

  handleClick = () => {
    if (this.state.isVisible) {
      this.hide();
      this.container.blur();
    } else {
      this.show();
    }
  };

  render() {
    const {
      sheet,
      classes,
      label,
      children,
      align,
      zIndex,
      direction,
      ...rest
    } = this.props;
    const { isVisible } = this.state;

    const classNames = classnames(classes.Popover, rest.className);

    return (
      <div
        {...rest}
        className={classNames}
        onClick={this.handleClick}
        tabIndex={-1}
        ref={this.containerRef}
      >
        {label}
        {isVisible
          ? <div className={classes[align]} style={this.getStyles()}>
              {children}
            </div>
          : null}
      </div>
    );
  }
}

export default Popover;
