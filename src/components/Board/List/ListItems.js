import React from 'react';
import { observer } from 'mobx-react';
import Item from './Item';

function ListItems({ list }) {
  console.log('render ListItems');
  return list.isEmpty ? (
    <p>you got nothing</p>
  ) : (
    <div>
      {list.items.map(item => (
        <Item item={item} key={item.id} />
      ))}
    </div>
  );
}

ListItems.propTypes = {
  list: React.PropTypes.object.isRequired
};

export default observer(ListItems);
