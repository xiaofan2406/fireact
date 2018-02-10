import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'utils';
import { withLogin } from 'factories';
import withCss from 'react-jss';
import classnames from 'classnames';
import { colors } from 'styles';

import Intro from './Intro';
import Header from './Header';
import Content from './Content';
import Events from './Events';

const css = {
  Board: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.white,
    minHeight: '100vh',
    '&.isEditing': {
      transition: 'background-color, 0.2s',
      backgroundColor: colors.grey100,
    },
  },
};

function Board({ classes, isEditingItem, location }) {
  console.log('render Board');
  const classNames = classnames({
    [classes.Board]: true,
    isEditing: isEditingItem,
  });

  return (
    <div className={classNames}>
      <Header />
      <Content type={location.pathname} />
      <Events />
    </div>
  );
}

Board.propTypes = {
  classes: PropTypes.object.isRequired,
  isEditingItem: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const enhance = compose(
  withLogin({ fallback: Intro }),
  inject(stores => ({
    isEditingItem: stores.boardStore.isEditingItem,
  })),
  withCss(css)
);

export default enhance(Board);
