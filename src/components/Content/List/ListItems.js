import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';

import Item from '../Item';

const css = {
  ListItems: {},
};

function ListItems({ classes, list }) {
  console.log('render ListItems');
  return list.isEmpty ? null : (
    <div className={classes.ListItems}>
      {list.activeItems.map(item => <Item item={item} key={item.id} />)}
    </div>
  );
}

ListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const enhance = compose(withCss(css), observer);

export default enhance(ListItems);
