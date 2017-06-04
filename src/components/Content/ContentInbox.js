import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import ContentStatus from './ContentStatus';
import Item from './Item';

const css = {
  ContentInbox: {
    padding: spacing.internalBreath,
    width: '100%',
    flex: 1
  }
};

function ContentInbox({ classes, boardStore }) {
  console.log('render ContentInbox');
  return boardStore.isInboxEmpty
    ? <ContentStatus type="empty" />
    : <span className={classes.ContentInbox}>
        {boardStore.inbox.activeItems.map(item =>
          <Item key={item.id} item={item} />
        )}
      </span>;
}

ContentInbox.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(ContentInbox);
