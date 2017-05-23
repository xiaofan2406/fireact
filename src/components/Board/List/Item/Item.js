import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemDisplay from './ItemDisplay';
import ItemEdit from './ItemEdit';

// TODO refactor this and ItemDisplay for performance
function Item({ item }) {
  console.log('render Item');
  return item.isEditing
    ? <ItemEdit item={item} />
    : <ItemDisplay item={item} />;
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default observer(Item);
