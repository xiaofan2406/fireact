import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import withCss from 'react-jss';
import { primaryColor } from 'styles';

const css = {
  greet: {
    margin: '0 auto',
    width: '460px'
  },
  controls: {
    marginBottom: '4em',
    '& input': {
      border: 'none',
      borderBottom: '1px solid #E0E0E0',
      outline: 'none',
      width: '100px',
      textAlign: 'center',
      '&:focus': {
        borderBottom: `1px solid ${primaryColor}`
      }
    },
    '& button': {
      marginLeft: '1em',
      outline: 'none',
      background: 'none',
      border: '1px solid #E0E0E0',

      '&:hover': {
        borderColor: primaryColor,
        color: primaryColor
      }
    }
  },
  result: {
    fontSize: '18px',
    fontFamily: 'cursive',
    '&:before': {
      content: '"“"'
    },
    '&:after': {
      content: '"”"'
    }
  }
};

@withCss(css)
@inject('greetStore')
@observer
class Greet extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    greetStore: PropTypes.object.isRequired
  };

  _changeMessage = e => {
    this.props.greetStore.setMessage(e.target.value);
  };

  _changeTimes = e => {
    this.props.greetStore.setTimes(+e.target.value);
  };

  _reset = () => {
    this.props.greetStore.reset();
  };

  render() {
    const { classes, greetStore } = this.props;
    return (
      <div className={classes.greet}>
        <div className={classes.controls}>
          <span>Say </span>
          <input
            type="text"
            onChange={this._changeMessage}
            value={greetStore.message}
          />
          <input
            type="number"
            min={1}
            onChange={this._changeTimes}
            value={greetStore.times}
          />
          {' '}
          times
          <button onClick={this._reset}>clear</button>
        </div>
        <div className={classes.result}>
          Hello {greetStore.greeting}
        </div>
      </div>
    );
  }
}

export default Greet;
