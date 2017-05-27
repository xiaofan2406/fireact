import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { size, spacing, theme, variables } from 'styles';

const css = {
  ListMenu: {
    display: 'flex'
  },
  button: {
    appearance: 'none',
    height: size.regular,
    width: variables.ListMenu.buttonWidth,
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

@inject('boardStore', 'viewStore')
@withCss(css)
@observer
class ListMenu extends React.Component {
  static propTypes = {
    boardStore: PropTypes.object.isRequired,
    // viewStore: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired
  };

  handleAddClick = () => {
    const { boardStore, list } = this.props;
    boardStore.newItem(list.id);
    // viewStore.startEditingItem(itemId);
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
    console.log('render ListMenu');
    const { classes } = this.props;
    return (
      <div className={classes.ListMenu}>
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

export default ListMenu;
