import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import classnames from 'classnames';
import compose from 'utils/compose';
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

function ItemDisplay({ classes, item, onFocus, onKeyUp }) {
  console.log('render ItemDisplay');
  const classNames = classnames({
    [classes.wrapper]: true,
    selected: item.isSelected
  });
  return (
    <div className={classNames} tabIndex={0} role="button" onKeyUp={onKeyUp}>
      <ItemCheckbox item={item} />
      <ItemContent item={item} onFocus={onFocus} />
    </div>
  );
}

ItemDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  onFocus: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired
};

const enhance = compose(withCss(css), observer);
export default enhance(ItemDisplay);
