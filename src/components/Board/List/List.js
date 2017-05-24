import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import ListName from './ListName';
import ListMenu from './ListMenu';
import ListItems from './ListItems';

const css = {
  List: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'rgb(23, 73, 181)',
    padding: '2px 2px',
    borderBottom: '1px solid rgb(228, 229, 233)',
    marginBottom: '12px',
    '&:focus': {
      outline: 'none',
      backgroundColor: 'rgb(200, 219, 254)'
    }
  }
};

function List({ classes, list }) {
  console.log('render List', list.id);
  return (
    <div className={classes.List}>
      <div className={classes.header} tabIndex={0} role="button">
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
