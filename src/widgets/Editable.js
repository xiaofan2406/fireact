import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';
import { keyCodes } from 'utils';

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

@withCss(css)
class Editable extends React.Component {
  static propTypes = {
    sheet: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    displayClass: PropTypes.string.isRequired,
    editingClass: PropTypes.string.isRequired,
    onDone: PropTypes.func.isRequired,
    singleLine: PropTypes.bool
  };

  static defaultProps = {
    singleLine: true
  };

  state = {
    isEditing: false
  };

  componentDidUpdate() {
    this.container.focus();
    const range = document.createRange();
    range.selectNodeContents(this.container);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  finishEditing = () => {
    this.props.onDone(this.container.innerText.trim());
    this.setState({
      isEditing: false
    });
  };

  handleDoubleClick = () => {
    if (!this.state.isEditing) {
      this.setState({
        isEditing: true
      });
    }
  };

  handleKeyDown = event => {
    const { singleLine } = this.props;
    if (event.which === keyCodes.ENTER && singleLine) {
      event.preventDefault();
      this.finishEditing();
    }
  };

  handleKeyUp = event => {
    if (event.which === keyCodes.ESC) {
      this.finishEditing();
    }
  };

  handleBlur = () => {
    if (this.state.isEditing) {
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
      ...rest
    } = this.props;
    const { isEditing } = this.state;
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
        onDoubleClick={this.handleDoubleClick}
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
