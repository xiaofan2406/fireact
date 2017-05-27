import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { spacing, theme } from 'styles';

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

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    const { boardStore, item } = this.props;
    if (event.which === 13) {
      boardStore.startEditingItem(item.id);
    }
    if (event.which === 27) {
      // boardStore.blurTarget(item.id);
      // this.container.blur();
    }
  };

  clickCount = 0;
  doubleClickTimer = null;
  DOUBLE_CLICK_DELAY = 300;

  handleContentClick = () => {
    this.clickCount++;
    if (this.clickCount === 1) {
      this.handleContentSingleClick();
      this.doubleClickTimer = setTimeout(() => {
        this.clickCount = 0;
      }, this.DOUBLE_CLICK_DELAY);
    } else {
      clearTimeout(this.doubleClickTimer);
      this.handleContentDoubleClick();
      this.clickCount = 0;
    }
  };

  handleContentSingleClick = () => {
    // const { boardStore, item } = this.props;
    // boardStore.focusTarget(item.id);
  };

  handleContentDoubleClick = () => {
    const { boardStore, item } = this.props;
    boardStore.startEditingItem(item.id);
  };

  render() {
    const { classes, item } = this.props;
    console.log('render Item');
    return (
      <div
        className={classes.Item}
        tabIndex={-1}
        ref={this.containerRef}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleContentClick}
      >
        <ItemDisplay item={item} />
      </div>
    );
  }
}

export default Item;
