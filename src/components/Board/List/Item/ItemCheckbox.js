import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Checkbox } from 'widgets';
import { compose } from 'utils';

const css = {
  ItemCheckbox: {
    marginRight: '8px',
    borderRadius: '2px'
  }
};

function ItemCheckbox({ classes, item }) {
  const handleToggle = () => {
    if (item.isCompleted) {
      item.setCompletionStatus(false);
    } else {
      item.setCompletionStatus(true);
    }
  };

  return (
    <Checkbox
      className={classes.ItemCheckbox}
      onToggle={handleToggle}
      checked={item.isCompleted}
    />
  );
}

ItemCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemCheckbox);
