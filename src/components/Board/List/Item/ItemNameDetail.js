import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import classnames from 'classnames';

const css = {
  ItemNameDetail: {
    display: 'inline-block',
    lineHeight: 1,
    cursor: 'default',
    userSelect: 'none',
    flex: 1,
    fontSize: '15px'
  },
  name: {
    color: 'black',
    '&.placeholder': {
      color: 'grey'
    }
  }
};

function ItemNameDetail({ classes, item }) {
  console.log('render NameDetail');
  const nameClasses = classnames({
    [classes.name]: true,
    placeholder: !item.name
  });
  return (
    <span className={classes.ItemNameDetail}>
      <span className={nameClasses}>{item.name || 'New To-Do'}</span>
    </span>
  );
}

ItemNameDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemNameDetail);
