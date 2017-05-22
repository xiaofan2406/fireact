import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import compose from 'utils/compose';
import ListName from './ListName';
import ListMenu from './ListMenu';
import ListItems from './ListItems';

const css = {
  container: {},
  header: {
    backgroundColor: 'rgb(200, 219, 254)'
  }
};

function List({ classes, list }) {
  console.log('render List', list.id);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
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
