import React from 'react';
import { inject, observer } from 'mobx-react';
import Redirect from 'react-router/Redirect';
import { removeLogin } from 'utils/storage';

@inject('userStore')
@observer
class Logout extends React.Component {
  static propTypes = {
    userStore: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    const { userStore } = this.props;
    removeLogin();
    userStore.logout();
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}


export default Logout;
