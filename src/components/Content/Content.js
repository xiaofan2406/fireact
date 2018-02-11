import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { css } from 'react-emotion';
import { compose } from 'utils';
import { boardTypes } from 'constants';
import { variables } from 'styles';

import ContentStatus from './ContentStatus';
import ContentLists from './ContentLists';
import ContentInbox from './ContentInbox';
import ContentTrash from './ContentTrash';

const contentStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${variables.Header.height}px);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 10;
    background-color: rgba(0, 0, 0, 0);
    border-radius: 100;
  }
  &::-webkit-scrollbar:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
  &::-webkit-scrollbar-thumb:vertical {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100;
    background-clip: padding-box;
    border: 2px solid rgba(0, 0, 0, 0);
    min-height: 10;
  }
  &::-webkit-scrollbar-thumb:vertical:active {
    background: rgba(0, 0, 0, 0.61);
    border-radius: 100;
  }
`;

function Content({ boardStore, type }) {
  console.log('render Content', type);

  let content;
  switch (type) {
    case boardTypes.Inbox.path:
      content = <ContentInbox />;
      break;
    case boardTypes.Trash.path:
      content = <ContentTrash />;
      break;
    default:
      content = <ContentLists />;
      break;
  }

  return (
    <div className={contentStyle}>
      {boardStore.isLoading ? <ContentStatus type="loading" /> : content}
    </div>
  );
}

Content.propTypes = {
  boardStore: PropTypes.object.isRequired,
  type: PropTypes.oneOf(Object.values(boardTypes).map(({ path }) => path))
    .isRequired,
};

const enhance = compose(inject('boardStore'), observer);

export default enhance(Content);
