import React from 'react';
import { observer } from 'mobx-react';

import ListMenu from './ListMenu';
import ListItems from './ListItems';

function List({ list }) {
  console.log('render List', list.id);
  return (
    <div>
      {list.title}
      <ListMenu list={list} />
      <ListItems list={list} />
    </div>
  );
}

List.propTypes = {
  list: React.PropTypes.object.isRequired
};

export default observer(List);
