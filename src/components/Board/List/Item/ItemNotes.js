import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { ContentEditable } from 'widgets';

@inject('viewStore')
@observer
class ItemNotes extends React.Component {
  static propTypes = {
    viewStore: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
  };

  editorRef = ref => {
    this.editor = ref;
  };

  handleKeyUp = event => {
    const { viewStore, item } = this.props;
    if (event.which === 27) {
      item.setNotes(this.editor.innerText);
      viewStore.finishEditingItem(item.id);
    }
  };

  handleBlur = () => {
    this.props.item.setNotes(this.editor.innerText);
  };

  render() {
    const { viewStore, item } = this.props;
    console.log('render ItemNotes');
    return viewStore.editingItemId === item.id
      ? <ContentEditable
          tabIndex={0}
          role="button"
          onKeyUp={this.handleKeyUp}
          onBlur={this.handleBlur}
          editorRef={this.editorRef}
          defaultText={item.notes}
          placeholder="Notes"
        />
      : null;
  }
}

export default ItemNotes;
