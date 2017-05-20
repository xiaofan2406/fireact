import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

function onlyAuth(Redirect) {
  return Component => {
    function OnlyAuth({ isAuthed, ...rest }) {
      return isAuthed ? <Component {...rest} /> : Redirect;
    }

    OnlyAuth.propTypes = {
      isAuthed: PropTypes.bool.isRequired
    };

    return inject(stores => ({
      isAuthed: stores.userStore.isAuthed
    }))(OnlyAuth);
  };
}

export default onlyAuth;
