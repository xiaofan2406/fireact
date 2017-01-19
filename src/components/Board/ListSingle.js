import React from 'react';
import { inject, observer } from 'mobx-react';


@inject('boardStore')
@observer
class ListSingle extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired,
    list: React.PropTypes.object.isRequired
  };

  delete = list => () => {
    list.delete();
  }

  newItem = list => (e) => {
    const { boardStore } = this.props;
    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newItem(e.target.value, list.id);
      e.target.value = '';
    }
  }

  render() {
    const { list } = this.props;
    console.log('render ListSingle');
    return (
      <div>
        <p>{list.path}</p>
        <input type="text" onKeyUp={this.newItem(list)} />
        <ul>{list.items.map(item =>
          <li key={item.id}>{item.title}, {item.id}</li>
        )}</ul>
      </div>
    );
  }
}


export default ListSingle;
