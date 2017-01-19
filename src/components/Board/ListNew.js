import React from 'react';
import { inject } from 'mobx-react';
import TextField from 'material-ui/TextField';

@inject('boardStore')
class ListNew extends React.Component {
  static propTypes = {
    boardStore: React.PropTypes.object.isRequired
  };

  newList = (e) => {
    const { boardStore } = this.props;

    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newList(e.target.value);
      e.target.value = '';
    }
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Name for a new list"
          onKeyUp={this.newList}
        />
      </div>
    );
  }
}


export default ListNew;
