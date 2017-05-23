/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';

const css = {
  container: {
    '&:empty:before': {
      content: 'attr(placeholder)',
      display: 'block',
      fontStyle: 'italic',
      color: 'grey'
    }
  }
};

function ContentEditable({ sheet, classes, defaultText, editorRef, ...rest }) {
  console.log('render ContentEditable');
  return (
    <div
      {...rest}
      className={classes.container}
      ref={editorRef}
      contentEditable
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: defaultText.replace(/(?:\r\n|\r|\n)/g, '<br />')
      }}
    />
  );
}

ContentEditable.propTypes = {
  sheet: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  defaultText: PropTypes.string.isRequired,
  editorRef: PropTypes.func.isRequired
};

export default withCss(css)(ContentEditable);
