import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { compose } from 'utils';
import classnames from 'classnames';
import { colors } from 'styles';

const css = {
  ItemMetaName: {
    color: colors.black,
    '&.placeholder': {
      color: colors.grey500,
    },
  },
};

function ItemMetaName({ classes, item }) {
  console.log('render ItemMetaName');

  const classNames = classnames({
    [classes.ItemMetaName]: true,
    placeholder: !item.name,
  });

  return <span className={classNames}>{item.name || 'New To-Do'}</span>;
}

ItemMetaName.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

const enhance = compose(withCss(css), observer);

export default enhance(ItemMetaName);
