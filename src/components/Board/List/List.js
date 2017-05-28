import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { theme, spacing } from 'styles';

import ListName from './ListName';
import ListMenu from './ListMenu';
import ListItems from './ListItems';

const css = {
  List: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.primaryColor,
    borderBottom: theme.border,
    borderTop: theme.borderTransparent,
    borderRadius: spacing.internal,
    padding: [spacing.internal, spacing.internalBreath],
    marginBottom: spacing.external,
    '&:focus': {
      outline: 'none',
      backgroundColor: theme.primaryAccent
    }
  }
};

function List({ classes, boardStore, list }) {
  console.log('render List', list.id);
  const handleFocus = () => {
    boardStore.selectList(list.id);
  };
  const handleBlur = () => {
    boardStore.unselectList(list.id);
  };

  return (
    <div className={classes.List}>
      <div
        className={classes.header}
        tabIndex={-1}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <ListName list={list} />
        <ListMenu list={list} />
      </div>
      <ListItems list={list} />
    </div>
  );
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(List);
