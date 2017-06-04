import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Redirect from 'react-router/Redirect';
import { loginCacher } from 'utils';

@inject('userStore')
@observer
class Logout extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  componentWillMount() {
    const { userStore } = this.props;
    loginCacher.clear();
    userStore.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
