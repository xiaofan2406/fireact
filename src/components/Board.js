import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { compose } from 'utils';
import { withLogin } from 'factories';
import { css, cx } from 'react-emotion';
import { colors } from 'styles';

import Intro from './Intro';
import Header from './Header';
import Content from './Content';
import Events from './Events';

const cssClass = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  min-height: 100vh;
  &.isEditingItem {
    transition: background-color, 0.2s;
    background-color: ${colors.grey100};
  }
`;

const Board = ({ isEditingItem, location }) => (
  <div className={cx(cssClass, { isEditingItem })}>
    <Header />
    <Content type={location.pathname} />
    <Events />
  </div>
);

Board.propTypes = {
  isEditingItem: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const enhance = compose(
  withLogin({ fallback: Intro }),
  inject(stores => ({
    isEditingItem: stores.boardStore.isEditingItem,
  }))
);

export default enhance(Board);
