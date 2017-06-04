import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { Loader } from 'widgets';
import { colors, variables } from 'styles';
import { compose } from 'utils';
import { statusTypes } from 'constants';

const css = {
  ContentStatus: {
    width: variables.ContentStatus.width,
    height: variables.ContentStatus.height,
    marginBottom: `${variables.ContentStatus.height / 2}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

function ContentStatus({ classes, type }) {
  console.log('render ContentStatus', type);
  let content;
  switch (type) {
    case statusTypes.Loading:
      content = <Loader color={colors.teal500} />;
      break;
    case statusTypes.Empty:
      content = <span>Nothing here yet.</span>;
      break;
    default:
      content = null;
      break;
  }

  return content === null
    ? null
    : <div className={classes.ContentStatus}>
        {content}
      </div>;
}

ContentStatus.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.oneOf(Object.values(statusTypes)).isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(ContentStatus);
