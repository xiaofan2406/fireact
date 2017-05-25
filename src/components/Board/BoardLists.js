import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import List from './List';

const css = {
  BoardLists: {
    padding: spacing.externalBreath
  },
  singleList: {
    margin: [
      spacing.externalBreath,
      spacing.externalBreath,
      spacing.externalBreath * 2,
      spacing.externalBreath
    ]
  }
};

function BoardLists({ classes, boardStore }) {
  return (
    <div className={classes.BoardLists}>
      {boardStore.lists.values().map(list => (
        <div className={classes.singleList} key={list.id}>
          <List list={list} />
        </div>
      ))}
    </div>
  );
}

BoardLists.propTypes = {
  boardStore: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), inject('boardStore'), observer);

export default enhance(BoardLists);
