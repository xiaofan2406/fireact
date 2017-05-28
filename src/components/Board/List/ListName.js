import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Editable } from 'widgets';
import { compose } from 'utils';
import { spacing, theme, colors } from 'styles';

const css = {
  ListName: {
    fontSize: theme.headingSize,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.externalBreath,
    '&:empty:before': {
      color: colors.blueA100
    }
  },
  ListName_display: {},
  ListName_editing: {
    outline: 'none'
  }
};

function ListName({ classes, list }) {
  console.log('render ListName');
  return (
    <Editable
      className={classes.ListName}
      value={list.name}
      displayClass={classes.ListName_display}
      editingClass={classes.ListName_editing}
      onDone={list.setName}
      placeholder="New Heading"
      autoTrim
    />
  );
}

ListName.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ListName);
