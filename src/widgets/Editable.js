import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';
import { keyboard } from 'utils';

const css = {
  Editable: {
    cursor: 'default',
    '&:empty:before': {
      content: 'attr(placeholder)',
      display: 'block'
    },
    '&.singleLine': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap'
    },
    '&.isEditing': {
      cursor: 'text'
    }
  }
};

// TODO more portable API
@withCss(css)
class Editable extends React.Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    displayClass: PropTypes.string.isRequired,
    editingClass: PropTypes.string.isRequired,
    onDone: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    value: PropTypes.string,
    singleLine: PropTypes.bool,
    doneOnBlur: PropTypes.bool,
    autoTrim: PropTypes.bool,
    onKeyDown: PropTypes.func
  };

  static defaultProps = {
    value: '',
    singleLine: true,
    autoTrim: false,
    doneOnBlur: false,
    onKeyDown: null
  };

  componentDidMount() {
    if (this.props.isEditing) {
      this.selfFocus();
    }
  }

  componentDidUpdate() {
    if (this.props.isEditing) {
      this.selfFocus();
    }
  }

  selfFocus = () => {
    this.container.focus();
    const range = document.createRange();
    range.selectNodeContents(this.container);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  finishEditing = () => {
    const { autoTrim, onDone } = this.props;
    const innerText = this.container.innerText;
    onDone(autoTrim ? innerText.trim() : innerText);
    // TODO if not autotrim replace newline with br
  };

  handleKeyDown = event => {
    if (keyboard.isEnter(event) && this.props.singleLine) {
      event.preventDefault();
      this.finishEditing();
      return;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  };

  handleKeyUp = event => {
    if (keyboard.isEsc(event)) {
      this.finishEditing();
    }
  };

  handleBlur = () => {
    const { doneOnBlur } = this.props;
    if (doneOnBlur) {
      this.finishEditing();
    }
  };

  containerRef = ref => {
    this.container = ref;
  };

  render() {
    const {
      sheet,
      classes,
      value,
      displayClass,
      editingClass,
      onDone,
      singleLine,
      autoTrim,
      doneOnBlur,
      isEditing,
      ...rest
    } = this.props;

    console.log('render Editable', isEditing);

    const classNames = classnames(classes.Editable, rest.className, {
      isEditing,
      singleLine: !isEditing,
      [displayClass]: !isEditing,
      [editingClass]: isEditing
    });
    return (
      <div
        {...rest}
        className={classNames}
        contentEditable={isEditing}
        suppressContentEditableWarning={isEditing}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        ref={this.containerRef}
      >
        {value}
      </div>
    );
  }
}

export default Editable;
