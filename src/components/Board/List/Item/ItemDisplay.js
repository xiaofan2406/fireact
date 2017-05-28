import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import withCss from 'react-jss';
import { colors, theme, spacing, variables } from 'styles';
import { TweenLite } from 'gsap';

import ItemCheckbox from './ItemCheckbox';
import ItemName from './ItemName';
import ItemNotes from './ItemNotes';
import ItemMeta from './ItemMeta';
import ItemAction from './ItemAction';

const css = {
  ItemDisplay: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    '&.isEditing': {
      backgroundColor: colors.white,
      boxShadow: theme.boxShadow,
      borderRadius: spacing.internal,
      margin: [
        spacing.externalBreath,
        -spacing.internalBreath,
        spacing.externalBreath * 2,
        -spacing.internalBreath
      ],
      padding: [spacing.internal, spacing.internalBreath]
    }
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: variables.ItemDisplay.minHeight
  },
  bottomRow: {
    paddingLeft: variables.ItemCheckbox.width + spacing.external
  }
};

@withCss(css)
@observer
class ItemDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { item } = this.props;
    if (item.isEditing && this.container) {
      TweenLite.fromTo(
        this.container,
        0.2,
        { css: { backgroundColor: colors.white } },
        { className: '+=isEditing', lazy: true }
      );
    }
  }

  componentDidUpdate() {
    const { item } = this.props;
    if (item.isEditing && this.container) {
      TweenLite.fromTo(
        this.container,
        0.2,
        { css: { backgroundColor: colors.white } },
        { className: '+=isEditing', lazy: true }
      );
    } else {
      TweenLite.fromTo(
        this.container,
        0.2,
        { css: { backgroundColor: 'transparent' } },
        { className: '-=isEditing', lazy: true }
      );
    }
  }

  containerRef = ref => {
    this.container = ref;
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemDisplay');

    return (
      <div className={classes.ItemDisplay} ref={this.containerRef}>
        <div className={classes.topRow}>
          <ItemCheckbox item={item} />
          {item.isEditing ? <ItemName item={item} /> : <ItemMeta item={item} />}

        </div>
        {item.isEditing
          ? <div className={classes.bottomRow}>
              <ItemNotes item={item} />
              <ItemAction item={item} />
            </div>
          : null}
      </div>
    );
  }
}

export default ItemDisplay;
