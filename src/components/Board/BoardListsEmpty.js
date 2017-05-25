import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { variables } from 'styles';

const css = {
  BoardListsEmpty: {
    position: 'absolute',
    width: variables.BoardListsEmpty.width,
    top: '35%',
    left: `calc((100% - ${variables.BoardListsEmpty.width}px)/2)`,
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
