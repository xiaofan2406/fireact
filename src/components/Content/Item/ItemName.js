import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { keyboard } from 'utils';
import { variables } from 'styles';

const css = {
  ItemName: {
    flex: 1,
    padding: 0,
    outline: 'none',
    border: 'none',
    lineHeight: variables.ItemMeta.lineHeight,
  },
};

@inject('boardStore')
@withCss(css)
@observer
class ItemName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  };

  componentDidMount() {
    if (this.input) {
      this.input.focus();
    }
  }

  componentDidUpdate() {
    if (this.input) {
      this.input.focus();
    }
  }

  inputRef = ref => {
    this.input = ref;
  };

  handleKeyUp = event => {
    const { boardStore, item } = this.props;
    if (keyboard.isEnter(event) || keyboard.isEsc(event)) {
      // stop ESC key event being propagated to Item
      event.stopPropagation();

      item.setName(this.input.value.trim());
      boardStore.finishEditingItem(item.id);
    }
  };

  handleBlur = () => {
    const { item } = this.props;
    item.setName(this.input.value.trim());
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemName');
    return (
      <input
        className={classes.ItemName}
        defaultValue={item.name}
        ref={this.inputRef}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        placeholder="New To-Do"
        spellCheck={false}
      />
    );
  }
}

export default ItemName;
