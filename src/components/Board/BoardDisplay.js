import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';
import { Loader } from 'widgets';
import { colors, variables } from 'styles';

import BoardEmpty from './BoardEmpty';
import BoardLists from './BoardLists';

const css = {
  BoardDisplay: {
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

@inject('boardStore')
@withCss(css)
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    boardStore: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { boardStore } = this.props;
    // TODO trigger this early
    boardStore.initialSync();
  }

  render() {
    const { classes, boardStore } = this.props;
    console.log('render BoardDisplay');

    let status;
    if (boardStore.isLoading) {
      status = <Loader color={colors.teal500} />;
    } else if (boardStore.isEmpty) {
      status = <BoardEmpty />;
    } else {
      status = null;
    }

    return (
      <div className={classes.BoardDisplay}>
        {status && <div className={classes.status}>{status}</div>}
        {status === null && <BoardLists />}
      </div>
    );
  }
}

export default BoardDisplay;
