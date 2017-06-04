import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Editable } from 'widgets';
import { compose } from 'utils';
import { spacing, theme, colors } from 'styles';

const css = {
  ListHeaderName: {
    fontSize: theme.headingSize,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.externalBreath,
    '&:empty:before': {
      color: colors.blue200
    }
  },
  ListHeaderName_display: {},
  ListHeaderName_editing: {
    outline: 'none'
  }
};

function ListHeaderName({ classes, list }) {
  const finishEditing = name => {
    list.setName(name);
    list.finishEditing();
  };

  return (
    <Editable
      className={classes.ListHeaderName}
      value={list.name}
      displayClass={classes.ListHeaderName_display}
      editingClass={classes.ListHeaderName_editing}
      isEditing={list.isEditing}
      onDone={finishEditing}
      onDoubleClick={list.startEditing}
      placeholder="New Heading"
      autoTrim
      doneOnBlur
    />
  );
}

ListHeaderName.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ListHeaderName);
