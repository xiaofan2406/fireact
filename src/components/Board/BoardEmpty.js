import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';

const css = {
  BoardEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

function BoardEmpty({ classes }) {
  return <div className={classes.BoardEmpty}>Nothing here yet.</div>;
}

BoardEmpty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withCss(css)(BoardEmpty);
