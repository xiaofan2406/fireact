import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import compose from 'utils/compose';
import ItemCheckbox from './ItemCheckbox';
import ItemContent from './ItemContent';
import ItemMenu from './ItemMenu';

const css = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    height: '28px'
  }
};

function Item({ classes, item }) {
  console.log('render Item', item.title);
  return (
    <div className={classes.wrapper}>
      <ItemCheckbox item={item} />
      <ItemContent item={item} />
      <ItemMenu item={item} />
    </div>
  );
}

Item.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);
export default enhance(Item);
