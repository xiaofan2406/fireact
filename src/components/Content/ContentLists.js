import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { css } from 'react-emotion';
import { compose } from 'utils';
import { spacing } from 'styles';

import ContentStatus from './ContentStatus';
import List from './List';

const contentListsStyle = css`
  padding: ${spacing.internalBreath}px;
  width: 100%;
  height: 100%;
`;

function ContentLists({ boardStore }) {
  console.log('render ContentLists');
  return boardStore.isEmpty ? (
    <ContentStatus type="empty" />
  ) : (
    <div className={contentListsStyle}>
      {boardStore.availableLists.map(list => (
        <List list={list} key={list.id} />
      ))}
    </div>
  );
}

ContentLists.propTypes = {
  boardStore: PropTypes.object.isRequired,
};

const enhance = compose(inject('boardStore'), observer);

export default enhance(ContentLists);
