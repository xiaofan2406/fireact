import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
// import { variables } from 'styles';

const css = {
  BoardListsEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

function BoardListsEmpty({ classes }) {
  return <div className={classes.BoardListsEmpty}>Nothing here yet.</div>;
}

BoardListsEmpty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCss(css)(BoardListsEmpty);
