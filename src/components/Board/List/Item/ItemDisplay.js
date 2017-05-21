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
      outline: 'none'
    },
    '&.selected': {
      backgroundColor: 'rgb(200, 219, 254)'
    }
  }
};

@withCss(css)
@inject('boardStore')
@observer
class ItemDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    onFocus: PropTypes.func.isRequired
  };

  componentDidMount() {
    console.log('mouted ItemDisplay');
    if (this.props.item.isSelected) {
      this.container.focus();
    }
  }

  containerRef = ref => {
    this.container = ref;
  };

  handleKeyUp = event => {
    console.log('handleKeyUp', this.props.item.isSelected);
    if (event.which === 13 && this.props.item.isSelected) {
      this.props.boardStore.editOnlyItem(this.props.item.id);
    }
    if (event.which === 27 && this.props.item.isSelected) {
      this.props.item.setSelectionStatus(false);
    }
  };

  render() {
    const { classes, item, onFocus } = this.props;
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
        <ItemContent item={item} onFocus={onFocus} />
      </div>
    );
  }
}

export default ItemDisplay;
