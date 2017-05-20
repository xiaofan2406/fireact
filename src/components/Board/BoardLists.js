import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import compose from 'utils/compose';

// import List from './List';

const css = {
  display: {
    padding: '1em'
  },
  single: {
    margin: '1em'
  }
};

function BoardLists({ boardStore, classes }) {
  console.log(classes);

  return boardStore.isEmpty ? <p>nothing here</p> : <p>something</p>;
}

BoardLists.propTypes = {
  boardStore: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), inject('boardStore'), observer);

export default enhance(BoardLists);
