import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { compose } from 'utils';
import ItemDisplay from './ItemDisplay';
import ItemEdit from './ItemEdit';

// TODO refactor this and ItemDisplay for performance
function Item({ viewStore, item }) {
  console.log('render Item');
  return viewStore.editingItemId === item.id
    ? <ItemEdit item={item} />
    : <ItemDisplay item={item} />;
}

Item.propTypes = {
  viewStore: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(inject('viewStore'), observer);
export default enhance(Item);
