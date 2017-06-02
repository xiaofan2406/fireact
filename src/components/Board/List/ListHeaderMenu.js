import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { Popover } from 'widgets';
import { spacing, theme, colors } from 'styles';

const css = {
  ListHeaderMenu: {
    fontSize: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: 'default',
    width: 28,
    '&:active, &:focus, &:hover': {
      backgroundColor: colors.grey200
    }
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: spacing.unit,
    padding: [spacing.internal, spacing.internal],
    borderRadius: spacing.unit,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: colors.white
  },
  item: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    whiteSpace: 'pre',
    fontSize: 14,
    padding: [spacing.unit, spacing.internal],
    margin: [spacing.unit],
    borderRadius: spacing.unit,
    '&>i': {
      marginRight: spacing.unit
    },
    '&:hover': {
      backgroundColor: theme.primaryColor
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
      <Popover
        className={classes.ListHeaderMenu}
        label={<i className="fa fa-ellipsis-h" aria-hidden="true" />}
        align="left"
        direction="bottom"
      >
        <div className={classes.menu}>
          <span className={classes.item} onClick={this.handleAddClick}>
            <i className="fa fa-plus" aria-hidden="true" /> New Item
          </span>
          <span className={classes.item} onClick={this.handleRemoveClick}>
            <i className="fa fa-remove" aria-hidden="true" /> Archive List
          </span>
        </div>
      </Popover>
    );
  }
}

export default ListHeaderMenu;
