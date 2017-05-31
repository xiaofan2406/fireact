import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import withCss from 'react-jss';
import { keyboard } from 'utils';
import { theme, spacing } from 'styles';

import ListHeaderName from './ListHeaderName';
import ListHeaderMenu from './ListHeaderMenu';

const css = {
  ListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.primaryColor,
    borderBottom: theme.border,
    borderTop: theme.borderTransparent,
    borderRadius: spacing.internal,
    padding: [spacing.internal, spacing.internalBreath],
    marginBottom: spacing.external,
    '&:focus': {
      outline: 'none',
      backgroundColor: theme.primaryAccent
    }
  }
};

@inject('boardStore')
@withCss(css)
class ListHeader extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (this.container) {
      this.props.list.getHeaderNode = this.getHeaderNode;
    }
  }

  getHeaderNode = () => this.container;

  containerRef = ref => {
    this.container = ref;
  };

  handleFocus = () => {
    const { boardStore, list } = this.props;
    boardStore.selectList(list.id);
  };

  handleBlur = () => {
    const { boardStore, list } = this.props;
    boardStore.unselectList(list.id);
  };

  handleKeyUp = event => {
    if (keyboard.isEsc(event)) {
      event.target.blur();
    }
  };

  render() {
    const { classes, list } = this.props;
    console.log('render ListHeader');
    return (
      <div
        className={classes.ListHeader}
        tabIndex={-1}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyUp={this.handleKeyUp}
        ref={this.containerRef}
      >
        <ListHeaderName list={list} />
        <ListHeaderMenu list={list} />
      </div>
    );
  }
}

export default ListHeader;
