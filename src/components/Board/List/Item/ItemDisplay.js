import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import classnames from 'classnames';
import { compose } from 'utils';
import ItemCheckbox from './ItemCheckbox';
import ItemName from './ItemName';
import ItemNotes from './ItemNotes';

const css = {
  ItemDisplay: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '32px',
    '&.isEditing': {
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 6px rgba(0,0,0,.2)',
      borderRadius: '4px',
      margin: '24px -12px 36px -12px',
      padding: '6px 12px'
    }
  },
  first: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '32px'
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
