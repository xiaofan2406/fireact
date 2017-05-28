import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { keyCodes } from 'utils';

const css = {
  ItemNameEdit: {
    outline: 'none',
    border: 'none'
  }
};

@inject('boardStore')
@withCss(css)
@observer
class ItemNameEdit extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    getContainer: PropTypes.func.isRequired
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
    const { boardStore, item, getContainer } = this.props;
    if (event.which === keyCodes.ENTER || event.which === keyCodes.ESC) {
      item.setName(this.input.value.trim());
      boardStore.finishEditingItem(item.id);
    }
    getContainer().focus();
    event.stopPropagation();
  };

  handleBlur = () => {
    const { item } = this.props;
    item.setName(this.input.value.trim());
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemNameEdit');
    return (
      <input
        className={classes.ItemNameEdit}
        defaultValue={item.name}
        ref={this.inputRef}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        placeholder="New To-Do"
      />
    );
  }
}

export default ItemNameEdit;
