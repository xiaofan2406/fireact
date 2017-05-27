import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Checkbox } from 'widgets';
import { compose } from 'utils';
import { spacing, variables } from 'styles';

const css = {
  ItemCheckbox: {
    marginRight: spacing.external,
    borderRadius: spacing.unit
  }
};

function ItemCheckbox({ classes, item }) {
  const handleToggle = () => {
    item.setCompletionStatus(!item.isCompleted);
  };

  return (
    <Checkbox
      className={classes.ItemCheckbox}
      onToggle={handleToggle}
      checked={item.isCompleted}
      size={variables.ItemCheckbox.width}
    />
  );
}

ItemCheckbox.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemCheckbox);
