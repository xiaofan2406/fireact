import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import classnames from 'classnames';

const css = {
  container: {
    display: 'inline-block',
    padding: ' 0px 8px',
    lineHeight: 1,
    cursor: 'default',
    userSelect: 'none',
    flex: 1
  },
  name: {
    color: 'black',
    '&.placeholder': {
      color: 'grey'
    }
  }
};

function ItemContent({ classes, item }) {
  console.log('render item content');
  const nameClasses = classnames({
    [classes.name]: true,
    placeholder: !item.name
  });
  return (
    <span className={classes.container}>
      <span className={nameClasses}>{item.name || 'New To-Do'}</span>
    </span>
  );
}

ItemContent.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemContent);
