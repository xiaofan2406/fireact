import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import classnames from 'classnames';
import { compose } from 'utils';
import { colors, theme, spacing, variables } from 'styles';

import ItemCheckbox from './ItemCheckbox';
import ItemNameEdit from './ItemNameEdit';
import ItemNotes from './ItemNotes';
import ItemNameDetail from './ItemNameDetail';

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

function ItemDisplay({ classes, item, getContainer }) {
  console.log('render ItemDisplay');
  const classNames = classnames({
    [classes.ItemDisplay]: true,
    isEditing: item.isEditing
  });
  return (
    <div className={classNames}>
      <div className={classes.first}>
        <ItemCheckbox item={item} />
        {item.isEditing
          ? <ItemNameEdit item={item} getContainer={getContainer} />
          : <ItemNameDetail item={item} />}

      </div>
      <div className={classes.second}>
        {item.isEditing
          ? <ItemNotes item={item} getContainer={getContainer} />
          : null}
      </div>
    </div>
  );
}

ItemDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  getContainer: PropTypes.func.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemDisplay);
