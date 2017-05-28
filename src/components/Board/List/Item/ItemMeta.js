import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { variables } from 'styles';

import ItemMetaName from './ItemMetaName';
import ItemMetaNotes from './ItemMetaNotes';

const css = {
  ItemMeta: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    userSelect: 'none',
    height: variables.ItemDisplay.minHeight,
    flex: 1,
    lineHeight: variables.ItemMeta.lineHeight
  }
};

function ItemMeta({ classes, item }) {
  console.log('render ItemMeta');

  return (
    <span className={classes.ItemMeta}>
      <ItemMetaName item={item} />
      <ItemMetaNotes item={item} />
    </span>
  );
}

ItemMeta.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemMeta);
