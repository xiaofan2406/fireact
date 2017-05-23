import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { ContentEditable } from 'widgets';

@observer class ItemEditNotes extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired
  };

  editorRef = ref => {
    this.editor = ref;
  };

  handleKeyUp = event => {
    if (event.which === 27 && this.props.item.isEditing) {
      this.props.item.setNotes(this.editor.innerText);
      this.props.item.setEditingStatus(false);
    }
  };

  handleBlur = () => {
    this.props.item.setNotes(this.editor.innerText);
  };

  render() {
    const { item } = this.props;
    console.log('render ItemEditNotes');
    return (
      <ContentEditable
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

export default ItemEditNotes;
