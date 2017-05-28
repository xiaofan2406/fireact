import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { spacing, theme } from 'styles';
import { keyCodes } from 'utils';

import ItemDisplay from './ItemDisplay';

const css = {
  Item: {
    padding: [0, spacing.internalBreath],
    margin: [spacing.unit],
    borderRadius: spacing.internal,
    cursor: 'default',
    userSelect: 'none',
    '&:focus': {
      outline: 'none',
      backgroundColor: theme.primaryAccent
    }
  }
};

@inject('boardStore')
@withCss(css)
@observer
class Item extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  }

  getContainerRef = () => this.container;

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    const { boardStore, item } = this.props;
    if (event.which === keyCodes.ENTER) {
      boardStore.startEditingItem(item.id);
    }
    if (event.which === keyCodes.ESC) {
      this.container.blur();
    }
  };

  handleOutsideClick = event => {
    if (this.container && !this.container.contains(event.target)) {
      const { boardStore, item } = this.props;
      boardStore.finishEditingItem(item.id);
    }
  };

  // clickCount = 0;
  // doubleClickTimer = null;
  // DOUBLE_CLICK_DELAY = 300;
  //
  // handleContentClick = () => {
  //   this.clickCount++;
  //   if (this.clickCount === 1) {
  //     this.handleContentSingleClick();
  //     this.doubleClickTimer = setTimeout(() => {
  //       this.clickCount = 0;
  //     }, this.DOUBLE_CLICK_DELAY);
  //   } else {
  //     clearTimeout(this.doubleClickTimer);
  //     this.handleContentDoubleClick();
  //     this.clickCount = 0;
  //   }
  // };
  //
  // handleContentSingleClick = () => {
  //   const { boardStore, item } = this.props;
  //   if (!item.isSelected) {
  //     boardStore.selectOnlyItem(item.id);
  //   }
  // };

  handleDoubleClick = () => {
    const { boardStore, item } = this.props;
    boardStore.startEditingItem(item.id);
  };

  render() {
    const { classes, item } = this.props;
    console.log('render Item');
    return (
      <div
        className={classes.Item}
        tabIndex={0}
        role="button"
        ref={this.containerRef}
        onKeyUp={this.handleKeyUp}
        onDoubleClick={this.handleDoubleClick}
        onClick={this.handleContentClick}
      >
        <ItemDisplay item={item} getContainer={this.getContainerRef} />
      </div>
    );
  }
}

export default Item;
