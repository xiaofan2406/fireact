import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { Editable } from 'widgets';
import { compose } from 'utils';

const css = {
  ListName_display: {},
  ListName_editing: {}
};

function ListName({ classes, list }) {
  console.log('render ListName');
  return (
    <Editable
      value={list.name}
      displayClass={classes.ListName_display}
      editingClass={classes.ListName_editing}
      onDone={list.setName}
    />
  );
}

ListName.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired
};

const enhance = compose(withCss(css), observer);

export default enhance(ListName);
