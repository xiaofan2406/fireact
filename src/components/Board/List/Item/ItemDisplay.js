import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import classnames from 'classnames';
import ItemCheckbox from './ItemCheckbox';
import ItemContent from './ItemContent';

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
    },
    '&.selected': {}
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
  //   if (this.props.item.isSelected) {
  //     this.container.focus();
  //   }
  // }

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    const { viewStore, item } = this.props;
    if (event.which === 13 && item.isSelected) {
      viewStore.setEditingItemId(item.uuid);
    }
    if (event.which === 27) {
      viewStore.unfocusTarget(item.uuid);
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
    viewStore.setFocusedTarget(item.uuid);
  };

  handleContentDoubleClick = () => {
    const { viewStore, item } = this.props;
    viewStore.setEditingItemId(item.uuid);
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemDisplay');
    const classNames = classnames({
      [classes.wrapper]: true,
      selected: item.isSelected
    });
    return (
      <div
        className={classNames}
        tabIndex={0}
        role="button"
        ref={this.containerRef}
        onKeyUp={this.handleKeyUp}
      >
        <ItemCheckbox item={item} />
        <ItemContent item={item} onContentClick={this.handleContentClick} />
      </div>
    );
  }
}

export default ItemDisplay;
