import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { saveLogin } from 'utils/storage';

const flatResult = result => ({
  token: result.credential.accessToken,
  email: result.user.email,
  displayName: result.user.displayName,
  uid: result.user.uid
});

@inject('userStore')
@observer
class Login extends React.Component {
  static propTypes = {
    userStore: PropTypes.object.isRequired
  };

  login = () => {
    const { userStore } = this.props;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        const info = flatResult(result);
        userStore.login(info);
        saveLogin(info);
      })
      .catch(console.errer);
  };

  render() {
    const { userStore } = this.props;
    return userStore.email
      ? <Redirect to="/" />
      : <div>
          <button onClick={this.login}>login</button>
        </div>;
  }
}

export default Login;
