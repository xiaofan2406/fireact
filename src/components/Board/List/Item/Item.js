import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ItemMenu from './ItemMenu';

function Item({ item }) {
  console.log('render Item', item.title);
  return (
    <div>
      {item.title}
      <ItemMenu item={item} />
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired
};

export default observer(Item);
