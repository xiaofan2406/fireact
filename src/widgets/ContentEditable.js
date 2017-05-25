/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import withCss from 'react-jss';
import classnames from 'classnames';

const css = {
  ContentEditable: {
    cursor: 'text',
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
  const classNames = classnames(classes.ContentEditable, rest.className);
  return (
    <div
      {...rest}
      className={classNames}
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
