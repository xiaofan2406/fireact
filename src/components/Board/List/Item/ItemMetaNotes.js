import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { colors, spacing } from 'styles';

const css = {
  ItemMetaNote: {
    fontSize: 12,
    color: colors.grey600,
    marginLeft: spacing.internal
  }
};

function ItemMetaNote({ classes, item }) {
  console.log('render ItemMetaNote', item.hasNotes);
  return item.hasNotes
    ? <span className={classes.ItemMetaNote} title="Double click to see notes">
        <i className="fa fa-file-o" aria-hidden="true" />
      </span>
    : null;
}

ItemMetaNote.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemMetaNote);
