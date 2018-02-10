import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { Editable } from 'widgets';
import { spacing } from 'styles';
import { keyboard } from 'utils';

const css = {
  ItemNotes: {
    paddingBottom: spacing.internalBreath,
    outline: 'none',
  },
};

@inject('boardStore')
@withCss(css)
@observer
class ItemNotes extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
  };

  editorRef = ref => {
    this.editor = ref;
  };

  handleOnDone = text => {
    this.props.item.setNotes(text);
  };

  handleKeyDown = event => {
    const { boardStore, item } = this.props;
    if (keyboard.isEsc(event)) {
      boardStore.finishEditingItem(item.id);
    }
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemNotes');
    return (
      <Editable
        className={classes.ItemNotes}
        tabIndex={0}
        role="button"
        isEditing
        onDone={this.handleOnDone}
        onKeyDown={this.handleKeyDown}
        defaultValue={item.notes}
        doneOnBlur
        placeholder="Notes"
      />
    );
  }
}

export default ItemNotes;
