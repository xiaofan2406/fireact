import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { Loader } from 'widgets';
import { colors, variables } from 'styles';
import { compose } from 'utils';

import Lists from './Lists';

const css = {
  Display: {
    flex: 1,
    position: 'relative'
  },
  status: {
    position: 'absolute',
    width: variables.BoardStatus.width,
    height: variables.BoardStatus.height,
    top: '35%',
    left: `calc((100% - ${variables.BoardStatus.width}px)/2)`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

function Display({ classes, boardStore }) {
  console.log('render Display');

  let status;
  if (boardStore.isLoading) {
    status = <Loader color={colors.teal500} />;
  } else if (boardStore.isEmpty) {
    status = <span>Nothing here yet.</span>;
  } else {
    status = null;
  }

  return (
    <div className={classes.Display}>
      {status && <div className={classes.status}>{status}</div>}
      {status === null && <Lists />}
    </div>
  );
}

Display.propTypes = {
  classes: PropTypes.object.isRequired,
  boardStore: PropTypes.object.isRequired
};

const enhance = compose(inject('boardStore'), withCss(css), observer);

export default enhance(Display);
