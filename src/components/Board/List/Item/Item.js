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
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
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
