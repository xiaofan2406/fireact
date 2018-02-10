import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import Redirect from 'react-router/Redirect';

@inject('userStore')
class Logout extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.props.userStore.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
