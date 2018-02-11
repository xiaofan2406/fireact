import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { css } from 'react-emotion';
import { withRouter } from 'factories';
import { colors } from 'styles';
import { IconButton } from 'widgets';
import { compose } from 'utils';
import { boardTypes } from 'constants';

const actionMenuStyle = css`
  display: flex
  align-items: center
`;

const actionMenuIconStyle = css`
  color: ${colors.grey700};
  font-size: 16px;
`;

const ActionMenu = ({ boardStore, router }) => (
  <div className={actionMenuStyle}>
    <IconButton
      onClick={() => {
        // TODO remove this when there is route-store
        router.push(boardTypes.Lists.path);
        boardStore.newList();
      }}
      className={actionMenuIconStyle}
      iconName="plus"
      title="New List"
    />
    <IconButton
      onClick={() => {
        // TODO remove this when there is route-store
        router.push(boardTypes.Lists.path);
        boardStore.newItem();
      }}
      className={actionMenuIconStyle}
      iconName="plus-square"
      title="New Item"
    />
  </div>
);

ActionMenu.propTypes = {
  boardStore: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

const enhance = compose(inject('boardStore'), withRouter);

export default enhance(ActionMenu);
