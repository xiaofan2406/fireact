import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import ItemCheckbox from './ItemCheckbox';
import ItemName from './ItemName';
import ItemNotes from './ItemNotes';

const css = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '28px',
    padding: '2px 8px',
    cursor: 'default',
    userSelect: 'none',
    '&:focus': {
      outline: 'none',
      backgroundColor: 'rgb(200, 219, 254)'
    }
  }
};

@withCss(css)
@inject('viewStore')
@observer
class ItemDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    viewStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  // componentDidMount() {
  //   if (this.props.viewStore.focusedTarget === this.props.item.uuid) {
  //     this.container.focus();
  //   }
  // }

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    const { viewStore, item } = this.props;
    // TODO press enter to edit
    // if (event.which === 13) {
    //   viewStore.startEditingItem(item.uuid);
    // }
    if (event.which === 27) {
      viewStore.blurTarget(item.uuid);
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
    viewStore.focusTarget(item.uuid);
  };

  handleContentDoubleClick = () => {
    const { viewStore, item } = this.props;
    viewStore.startEditingItem(item.uuid);
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemDisplay');
    return (
      <div
        className={classes.wrapper}
        tabIndex={-1}
        ref={this.containerRef}
        onKeyUp={this.handleKeyUp}
        onClick={this.handleContentClick}
      >
        <ItemCheckbox item={item} />
        <ItemName item={item} />
        <ItemNotes item={item} />
      </div>
    );
  }
}

export default ItemDisplay;
