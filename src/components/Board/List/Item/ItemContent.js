import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import compose from 'utils/compose';

const css = {
  title: {
    display: 'inline-block'
  }
};

function ItemContent({ classes, item }) {
  console.log('render item content');
  return <span className={classes.title}>{item.title}</span>;
}

ItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemContent);
