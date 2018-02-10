import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import withCss from 'react-jss';
import { withRouter } from 'hocs';
import { colors } from 'styles';
import { IconButton } from 'widgets';
import { compose } from 'utils';
import { boardTypes } from 'constants';

const css = {
  ActionMenu: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    color: colors.grey700,
  },
};

function ActionMenu({ classes, boardStore, router }) {
  const handleNewList = () => {
    // TODO remove this when there is route-store
    router.push(boardTypes.Lists.path);
    boardStore.newList();
  };

  const handleNewItem = () => {
    // TODO remove this when there is route-store
    router.push(boardTypes.Lists.path);
    boardStore.newItem();
  };

  return (
    <div className={classes.menu}>
      <IconButton
        onClick={handleNewList}
        className={classes.icon}
        iconName="plus"
        title="New List"
      />
      <IconButton
        onClick={handleNewItem}
        className={classes.icon}
        iconName="plus-square"
        title="New Item"
      />
    </div>
  );
}

ActionMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

const enhance = compose(inject('boardStore'), withCss(css), withRouter);

export default enhance(ActionMenu);
