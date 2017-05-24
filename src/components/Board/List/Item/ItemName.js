import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import ItemNameDetail from './ItemNameDetail';

const css = {
  ItemName: {
    outline: 'none',
    border: 'none',
    fontSize: '15px'
  }
};

@inject('viewStore')
@withCss(css)
@observer
class ItemName extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    viewStore: PropTypes.object.isRequired,
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
    const { viewStore, item } = this.props;
    if (event.which === 27 || event.which === 13) {
      this.props.item.setName(this.input.value.trim());
      viewStore.finishEditingItem(item.id);
    }
  };

  handleBlur = () => {
    this.props.item.setName(this.input.value.trim());
  };

  render() {
    const { classes, viewStore, item } = this.props;
    console.log('render ItemName');
    return viewStore.editingItemId === item.id
      ? <input
          className={classes.ItemName}
          tabIndex={0}
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
