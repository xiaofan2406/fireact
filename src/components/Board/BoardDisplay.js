import React from 'react';
import { inject, observer } from 'mobx-react';


@inject('boardStore')
@observer
class BoardDisplay extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const { boardStore } = this.props;
    if (boardStore.isEmpty) {
      boardStore.getLists();
      console.log('gonna retrieve data');
    }
  }

  delete = list => () => {
    list.delete();
  }

  render() {
    const { boardStore: { lists } } = this.props;
    return (
      <div>
        {lists.map(list => (
          <div key={list.id}>
            <p>{list.path}</p>
            <p>{list.title}</p>
            <button onClick={this.delete(list)}>x</button>
          </div>
        ))}
      </div>
    );
  }
}


export default BoardDisplay;
