import React from 'react';
import { inject, observer } from 'mobx-react';
import injectSheet from 'styles';
import compose from 'utils/compose';
import ListSingle from './ListSingle';

const sheet = {
  display: {
    padding: '1em'
  },
  single: {
    margin: '1em'
  }
};


function ListDisplay({ boardStore, sheet: { classes } }) {
  console.log('render ListDisplay');

  return boardStore.isEmpty ? (
    <p>nothing here</p>
  ) : (
    <div className={classes.display}>
      {boardStore.lists.values().map(list => (
        <div className={classes.single}>
          <ListSingle list={list} key={list.id} />
        </div>
      ))}
    </div>
  );
}
ListDisplay.propTypes = {
  boardStore: React.PropTypes.object.isRequired,
  sheet: React.PropTypes.object.isRequired
};

const enhance = compose(
  injectSheet(sheet),
  inject('boardStore'),
  observer
);

export default enhance(ListDisplay);
