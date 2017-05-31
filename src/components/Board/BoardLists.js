import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import List from './List';

const css = {
  BoardLists: {
    padding: spacing.internalBreath
  }
};

function BoardLists({ classes, boardStore }) {
  console.log('render BoardLists');
  return (
    <div className={classes.BoardLists}>
      {boardStore.availableLists.map(list => (
        <List list={list} key={list.id} />
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
