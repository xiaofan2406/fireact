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

@withCss(css)
@inject('viewStore')
@observer
class Item extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    viewStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    const { viewStore, item } = this.props;
    // TODO press enter to edit
    // if (event.which === 13) {
    //   viewStore.startEditingItem(item.id);
    // }
    if (event.which === 27) {
      viewStore.blurTarget(item.id);
      this.container.blur();
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
    const { viewStore, item } = this.props;
    viewStore.focusTarget(item.id);
  };

  handleContentDoubleClick = () => {
    const { viewStore, item } = this.props;
    viewStore.startEditingItem(item.id);
  };

  handleBlur = () => {
    console.log('blured');
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
        onBlur={this.handleBlur}
        onClick={this.handleContentClick}
      >
        <ItemDisplay item={item} />
      </div>
    );
  }
}

export default Item;
