import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import ContentStatus from './ContentStatus';
import List from './List';

const css = {
  ContentLists: {
    padding: spacing.internalBreath,
    width: '100%',
    height: '100%',
  },
};

function ContentLists({ classes, boardStore }) {
  console.log('render ContentLists');
  return boardStore.isEmpty ? (
    <ContentStatus type="empty" />
  ) : (
    <div className={classes.ContentLists}>
      {boardStore.availableLists.map(list => (
        <List list={list} key={list.id} />
      ))}
    </div>
  );
}

ContentLists.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired,
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(ContentLists);
