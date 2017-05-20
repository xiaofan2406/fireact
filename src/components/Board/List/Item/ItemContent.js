import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';

const css = {
  container: {
    border: '1px solid #eeeeee',
    padding: '8px 18px',
    margin: '8px 0px',
    fontSize: '1.2rem',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
    }
  },
  title: {
    display: 'inline-block'
  },
  description: {}
};

function ItemContent({ classes, item }) {
  return (
    <div className={classes.container}>
      <strong className={classes.title}>{item.title}</strong>
      {item.description &&
        <div className={classes.description}>{item.description}</div>}
    </div>
  );
}

ItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

export default withCss(css)(ItemContent);
