import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { sizes, spacing, theme, variables } from 'styles';

const css = {
  ListHeaderMenu: {
    display: 'flex'
  },
  button: {
    appearance: 'none',
    height: sizes.regular,
    width: variables.ListHeaderMenu.buttonWidth,
    margin: [0, spacing.unit],
    padding: [spacing.unit],
    backgroundColor: 'transparent',
    border: theme.borderTransparent,
    borderRadius: spacing.internal,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    '&:hover': {
      border: theme.border
    }
  }
};

@inject('boardStore')
@withCss(css)
@observer
class ListHeaderMenu extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  handleAddClick = () => {
    const { boardStore, list } = this.props;
    boardStore.newItem(list.id);
  };

  handleRemoveClick = () => {
    const { boardStore, list } = this.props;
    // TODO replace confirm with a custom alert service
    // if (confirm('Are you sure you want to delete the whole list?')) {
    boardStore.removeList(list.id);
    // TODO create a `inbox` list for items with no list
    // }
  };

  render() {
    console.log('render ListHeaderMenu');
    const { classes } = this.props;
    return (
      <div className={classes.ListHeaderMenu}>
        <button className={classes.button} onClick={this.handleAddClick}>
          <i className="fa fa-plus" aria-hidden="true" />
        </button>
        <button className={classes.button} onClick={this.handleRemoveClick}>
          <i className="fa fa-remove" aria-hidden="true" />
        </button>
      </div>
    );
  }
}

export default ListHeaderMenu;
