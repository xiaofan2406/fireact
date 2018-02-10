/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from 'react-emotion';
import { keyboard } from 'utils';

const cssClass = css`
  cursor: default;
  word-break: break-word;
  &:empty:before {
    content: attr(placeholder);
    display: block;
  }
  &.inline {
    text-wverflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.isEditing {
    cursor: text;
  }
`;

class Editable extends React.Component {
  static propTypes = {
    onDone: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    defaultValue: PropTypes.string,
    inline: PropTypes.bool,
    autoTrim: PropTypes.bool,
    doneOnBlur: PropTypes.bool,
    displayClass: PropTypes.string,
    editingClass: PropTypes.string,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    defaultValue: '',
    inline: false,
    autoTrim: false,
    doneOnBlur: false,
    displayClass: null,
    editingClass: null,
    onKeyDown: null,
    onBlur: null,
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
    const result = autoTrim
      ? this.container.innerText.replace(/(?:\r\n|\r|\n)/g, ' ').trim()
      : this.container.innerText.replace(/(?:\r\n|\r|\n)/g, '<br />');
    onDone(result);
  };

  handleKeyDown = event => {
    event.stopPropagation();
    const { isEditing, inline, onKeyDown } = this.props;
    if (isEditing && inline && keyboard.isEnter(event)) {
      event.preventDefault();
      this.finishEditing();
    }
    if (keyboard.isEsc(event)) {
      this.finishEditing();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  handleBlur = event => {
    event.stopPropagation();
    const { doneOnBlur } = this.props;
    if (doneOnBlur) {
      this.finishEditing();
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  containerRef = ref => {
    this.container = ref;
  };

  render() {
    const {
      onDone,
      isEditing,
      defaultValue,
      inline,
      autoTrim,
      doneOnBlur,
      displayClass,
      editingClass,
      onKeyDown,
      onBlur,
      ...rest
    } = this.props;

    console.log('render Editable', isEditing);

    const classNames = cx(cssClass, rest.className, {
      isEditing,
      inline: inline && !isEditing,
      [displayClass]: !isEditing,
      [editingClass]: isEditing,
    });

    return (
      <div
        {...rest}
        className={classNames}
        contentEditable={isEditing}
        suppressContentEditableWarning={isEditing}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        ref={this.containerRef}
        dangerouslySetInnerHTML={{
          __html: defaultValue.replace(/(?:\r\n|\r|\n)/g, '<br />'),
        }}
      />
    );
  }
}

export default Editable;
