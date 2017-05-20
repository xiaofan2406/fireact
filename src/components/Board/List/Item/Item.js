import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ItemContent from './ItemContent';
import ItemMenu from './ItemMenu';

function Item({ item }) {
  console.log('render Item', item.title);
  return (
    <div>
      <ItemContent item={item} />
      <ItemMenu item={item} />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default observer(Item);
