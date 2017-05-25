import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import withCss from 'react-jss';

import BoardStatus from './BoardStatus';
import BoardLists from './BoardLists';

const css = {
  BoardDisplay: {
    flex: 1,
    position: 'relative'
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

    return (
      <div className={classes.BoardDisplay}>
        {boardStore.isLoading || boardStore.isEmpty
          ? <BoardStatus />
          : <BoardLists />}
      </div>
    );
  }
}

export default BoardDisplay;
