import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import { spacing } from 'styles';

import ItemActionSave from './ItemActionSave';

const css = {
  ItemAction: {
    paddingBottom: spacing.internalBreath
  }
};

function ItemAction({ classes, item }) {
  console.log('render ItemAction');
  return (
    <div className={classes.ItemAction}>
      ItemAction<ItemActionSave item={item} />
    </div>
  );
}

ItemAction.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

export default withCss(css)(ItemAction);
