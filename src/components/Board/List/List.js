import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import ListMenu from './ListMenu';
import ListItems from './ListItems';

function List({ list }) {
  console.log('render List', list.id);
  return (
    <div>
      <ListMenu list={list} />
      <ListItems list={list} />
    </div>
  );
}

List.propTypes = {
  list: PropTypes.object.isRequired
};

export default observer(List);
