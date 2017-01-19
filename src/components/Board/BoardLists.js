import React from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'styles';
import compose from 'utils/compose';

import List from './List';

const sheet = {
  display: {
    padding: '1em'
  },
  single: {
    margin: '1em'
  }
};

function BoardLists({ boardStore, sheet: { classes } }) {
  console.log('render BoardLists');

  return boardStore.isEmpty ? (
    <p>nothing here</p>
  ) : (
    <div className={classes.display}>
      {boardStore.lists.values().map(list => (
        <div className={classes.single} key={list.id}>
          <List list={list} />
        </div>
      ))}
    </div>
  );
}

BoardLists.propTypes = {
  boardStore: React.PropTypes.object.isRequired,
  sheet: React.PropTypes.object.isRequired
};

const enhance = compose(
  injectSheet(sheet),
  inject('boardStore'),
  observer
);

export default enhance(BoardLists);
