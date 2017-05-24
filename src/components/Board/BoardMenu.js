import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';

function BoardMenu({ boardStore }) {
  console.log('render BoardMenu');

  const newList = e => {
    if (e.which === 27) {
      e.target.value = '';
    } else if (e.which === 13) {
      boardStore.newList(e.target.value.trim());
      e.target.value = '';
    }
  };

  return (
    <div>
      <input placeholder="Name for a new list" onKeyUp={newList} type="text" />
    </div>
  );
}

BoardMenu.propTypes = {
  boardStore: PropTypes.object.isRequired
};

export default inject('boardStore')(observer(BoardMenu));

// class BoardMenu extends React.PureComponent {
//   static propTypes = {
//     boardStore: PropTypes.object.isRequired
//   };
//
//   newList = e => {
//     const { boardStore } = this.props;
//
//     if (e.which === 27) {
//       e.target.value = '';
//     } else if (e.which === 13) {
//       boardStore.newList(e.target.value.trim());
//       e.target.value = '';
//     }
//   };
//
//   render() {
//     console.log('render BoardMenu');
//     return (
//       <div>
//         <input
//           placeholder="Name for a new list"
//           onKeyUp={this.newList}
//           type="text"
//         />
//       </div>
//     );
//   }
// }
//
// export default BoardMenu;
