import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import compose from 'utils/compose';

const css = {
  name: {
    display: 'inline-block',
    padding: ' 0px 8px',
    lineHeight: 1,
    cursor: 'default',
    userSelect: 'none',
    flex: 1
  }
};

function ItemContent({ classes, item, onContentClick }) {
  console.log('render item content');
  return (
    <span className={classes.name} onClick={onContentClick}>
      {item.name}
    </span>
  );
}

ItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onContentClick: PropTypes.func.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemContent);
