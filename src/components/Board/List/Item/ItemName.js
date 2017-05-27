import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import ItemNameDetail from './ItemNameDetail';

const css = {
  ItemName: {
    outline: 'none',
    border: 'none'
  }
};

@inject('boardStore')
@withCss(css)
@observer
class ItemName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

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
    if (event.which === 27 || event.which === 13) {
      item.setName(this.input.value.trim());
      boardStore.finishEditingItem(item.id);
      event.stopPropagation();
    }
  };

  handleBlur = () => {
    const { item } = this.props;
    item.setName(this.input.value.trim());
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemName');
    return item.isEditing
      ? <input
          className={classes.ItemName}
          defaultValue={item.name}
          ref={this.inputRef}
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          placeholder="New To-Do"
        />
      : <ItemNameDetail item={item} />;
  }
}

export default ItemName;
