import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

function withLogin({ assert = true, fallback: Fallback }) {
  return Component => {
    function WithLogin({ isAuthed, ...rest }) {
      if (isAuthed === assert) {
        return <Component {...rest} />;
      }
      return Fallback ? <Fallback {...rest} /> : null;
    }

    WithLogin.propTypes = {
      isAuthed: PropTypes.bool.isRequired
    };

    return inject(stores => ({
      isAuthed: stores.userStore.isAuthed
    }))(WithLogin);
  };
}

export default withLogin;
