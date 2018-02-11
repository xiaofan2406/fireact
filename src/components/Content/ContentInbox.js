import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { css } from 'react-emotion';
import { compose } from 'utils';
import { spacing } from 'styles';

import ContentStatus from './ContentStatus';
import Item from './Item';

const contentInboxStyle = css`
  padding: ${spacing.internalBreath}px;
  width: 100%;
  height: 100%;
`;

function ContentInbox({ boardStore }) {
  console.log('render ContentInbox');
  return boardStore.isInboxEmpty ? (
    <ContentStatus type="empty" />
  ) : (
    <span className={contentInboxStyle}>
      {boardStore.inbox.activeItems.map(item => (
        <Item key={item.id} item={item} />
      ))}
    </span>
  );
}

ContentInbox.propTypes = {
  boardStore: PropTypes.object.isRequired,
};

const enhance = compose(inject('boardStore'), observer);

export default enhance(ContentInbox);
