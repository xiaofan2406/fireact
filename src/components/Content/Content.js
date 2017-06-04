import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { boardTypes } from 'constants';
import { variables } from 'styles';

import ContentStatus from './ContentStatus';
import ContentLists from './ContentLists';
import ContentInbox from './ContentInbox';
import ContentTrash from './ContentTrash';

const css = {
  Content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: `calc(100vh - ${variables.BoardHeader.height}px)`,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 10,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      borderRadius: 100
    },
    '&::-webkit-scrollbar:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.09)'
    },
    '&::-webkit-scrollbar-thumb:vertical': {
      background: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 100,
      backgroundClip: 'padding-box',
      border: '2px solid rgba(0, 0, 0, 0)',
      minHeight: 10
    },
    '&::-webkit-scrollbar-thumb:vertical:active': {
      background: 'rgba(0, 0, 0, 0.61)',
      borderRadius: 100
    }
  }
};

function Content({ classes, boardStore, type }) {
  console.log('render Content', type);

  let content;
  switch (type) {
    case boardTypes.Inbox:
      content = <ContentInbox />;
      break;
    case boardTypes.Trash:
      content = <ContentTrash />;
      break;
    default:
      content = <ContentLists />;
      break;
  }

  return (
    <div className={classes.Content}>
      {boardStore.isLoading ? <ContentStatus type="loading" /> : content}
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired,
  type: PropTypes.oneOf(Object.values(boardTypes)).isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(Content);
