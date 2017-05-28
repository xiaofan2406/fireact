import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';

const css = {
  ItemActionSave: {}
};

function ItemActionSave({ classes, boardStore, item }) {
  console.log('render action');
  const save = () => {
    boardStore.finishEditingItem(item.id);
  };
  return (
    <button className={classes.ItemActionSave} onClick={save}> Save </button>
  );
}

ItemActionSave.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css));

export default enhance(ItemActionSave);
