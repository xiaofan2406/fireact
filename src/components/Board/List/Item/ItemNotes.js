import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { ContentEditable } from 'widgets';
import { spacing, variables } from 'styles';
import { keyCodes } from 'utils';

const css = {
  ItemNotes: {
    margin: [
      spacing.external,
      0,
      0,
      variables.ItemCheckbox.width + spacing.external
    ],
    paddingBottom: spacing.internalBreath,
    outline: 'none'
  }
};

@inject('boardStore')
@withCss(css)
@observer
class ItemNotes extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    getContainer: PropTypes.func.isRequired
  };

  editorRef = ref => {
    this.editor = ref;
  };

  handleKeyUp = event => {
    const { boardStore, item, getContainer } = this.props;

    if (event.which === keyCodes.ESC) {
      // stop ESC key event being propagated to Item
      event.stopPropagation();

      item.setNotes(this.editor.innerText);
      boardStore.finishEditingItem(item.id);
      getContainer().focus();
    }
  };

  handleBlur = () => {
    const { item } = this.props;
    item.setNotes(this.editor.innerText);
  };

  render() {
    const { classes, item } = this.props;
    console.log('render ItemNotes');
    return (
      <ContentEditable
        className={classes.ItemNotes}
        tabIndex={0}
        role="button"
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        editorRef={this.editorRef}
        defaultText={item.notes}
        placeholder="Notes"
      />
    );
  }
}

export default ItemNotes;
