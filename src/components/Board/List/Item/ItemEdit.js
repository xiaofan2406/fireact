import React from 'react';
import PropTypes from 'prop-types';

import ItemEditName from './ItemEditName';
import ItemEditNotes from './ItemEditNotes';

function ItemEdit({ item }) {
  return (
    <div>
      <ItemEditName item={item} />
      <ItemEditNotes item={item} />
    </div>
  );
}

ItemEdit.propTypes = {
  item: PropTypes.object.isRequired
};

export default ItemEdit;
