import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import ContentStatus from './ContentStatus';
import Item from './Item';

const css = {
  ContentTrash: {
    padding: spacing.internalBreath,
    width: '100%',
    height: '100%'
  }
};

function ContentTrash({ classes, boardStore }) {
  console.log('render ContentTrash');
  return boardStore.isTrashEmpty
    ? <ContentStatus type="empty" />
    : <span className={classes.ContentTrash}>
        {boardStore.trash.map(item => <Item key={item.id} item={item} />)}
      </span>;
}

ContentTrash.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(ContentTrash);
