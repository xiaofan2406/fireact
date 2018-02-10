import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import { spacing } from 'styles';

import ListHeader from './ListHeader';
import ListItems from './ListItems';

const css = {
  List: {
    margin: [
      spacing.externalBreath,
      spacing.externalBreath,
      spacing.externalBreath * 2,
      spacing.externalBreath,
    ],
  },
};

function List({ classes, list }) {
  console.log('render List');
  return (
    <div className={classes.List}>
      <ListHeader list={list} />
      <ListItems list={list} />
    </div>
  );
}

List.propTypes = {
  classes: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

const enhance = compose(withCss(css), observer);

export default enhance(List);
