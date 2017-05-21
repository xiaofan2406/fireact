import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';

const css = {
  container: {
    cursor: 'default',
    '&.isEditing': {
      cursor: 'text'
    }
  }
};

@withCss(css)
class Editable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
    onDone: PropTypes.func.isRequired
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

  handleDoubleClick = () => {
    if (!this.state.isEditing) {
      this.setState({
        isEditing: true
      });
    }
  };

  handleKeyUp = event => {
    if (event.which === 27) {
      this.props.onDone(this.container.innerText.trim());
      this.setState({
        isEditing: false
      });
    }
  };

  handleBlur = () => {
    if (this.state.isEditing) {
      this.props.onDone(this.container.innerText.trim());
      this.setState({
        isEditing: false
      });
    }
  };

  containerRef = ref => {
    this.container = ref;
  };

  render() {
    const { classes, value } = this.props;
    const { isEditing } = this.state;
    const classNames = classnames({
      [classes.container]: true,
      isEditing
    });

    return (
      <div
        className={classNames}
        contentEditable={isEditing}
        suppressContentEditableWarning={isEditing}
        onDoubleClick={this.handleDoubleClick}
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
