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
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
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

  handleKeyDown = event => {
    event.preventDefault();
    if (keyboard.isEnter(event)) {
      this.props.list.startEditing();
    } else if (keyboard.isEsc(event)) {
      event.target.blur();
    } else if (keyboard.isRemove(event)) {
      this.props.list.destroy();
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
        onKeyDown={this.handleKeyDown}
        ref={this.containerRef}
      >
        <ListHeaderName list={list} />
        <ListHeaderMenu list={list} />
      </div>
    );
  }
}

export default ListHeader;
