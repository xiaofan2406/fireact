import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import classnames from 'classnames';
import { compose } from 'utils';
import { colors, theme, spacing, variables } from 'styles';

import ItemCheckbox from './ItemCheckbox';
import ItemName from './ItemName';
import ItemNotes from './ItemNotes';

const css = {
  ItemDisplay: {
    display: 'flex',
    flexDirection: 'column',
    '&.isEditing': {
      backgroundColor: colors.white,
      boxShadow: theme.boxShadow,
      borderRadius: spacing.internal,
      margin: [
        spacing.externalBreath,
        -spacing.internalBreath,
        spacing.externalBreath * 2,
        -spacing.internalBreath
      ],
      padding: [spacing.internal, spacing.internalBreath]
    }
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    minHeight: variables.ItemDisplay.minHeight
  },
  second: {}
};

function ItemDisplay({ classes, viewStore, item }) {
  console.log('render ItemDisplay');
  const classNames = classnames({
    [classes.ItemDisplay]: true,
    isEditing: viewStore.isEditingItem(item)
  });
  return (
    <div className={classNames}>
      <div className={classes.first}>
        <ItemCheckbox item={item} />
        <ItemName item={item} />
      </div>
      <div className={classes.second}>
        <ItemNotes item={item} />
      </div>
    </div>
  );
}

ItemDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  viewStore: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(inject('viewStore'), withCss(css), observer);

export default enhance(ItemDisplay);
