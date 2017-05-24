import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { colors } from 'styles';

import ListName from './ListName';
import ListMenu from './ListMenu';
import ListItems from './ListItems';

const css = {
  List: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: colors.primary,
    fontWeight: 'bold',
    padding: '2px 2px',
    borderBottom: '1px solid rgb(228, 229, 233)',
    marginBottom: '12px',
    '&:focus': {
      outline: 'none',
      backgroundColor: colors.primaryAccent
    }
  }
};

function List({ classes, list }) {
  console.log('render List', list.id);
  return (
    <div className={classes.List}>
      <div className={classes.header} tabIndex={-1}>
        <ListName list={list} />
        <ListMenu list={list} />
      </div>
      <ListItems list={list} />
    </div>
  );
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(List);
