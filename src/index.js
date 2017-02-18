import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import 'utils/firebase';
import { loadLogin } from 'utils/storage';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Router from './router';
import createStore from './store';

const stores = createStore({
  userStore: loadLogin()
});

const rootElement = document.getElementById('root');

useStrict(true);
injectTapEventPlugin();

if (process.env.NODE_ENV === 'development') { // react-hot-loader setup
  const AppContainer = require('react-hot-loader').AppContainer; // eslint-disable-line global-require

  ReactDOM.render(
    <AppContainer>
      <Provider {...stores}>
        <Router />
      </Provider>
    </AppContainer>,
    rootElement
  );

  if (module.hot) {
    module.hot.accept('./router', () => {
      const NextRouter = require('./router').default; // eslint-disable-line global-require
      ReactDOM.render(
        <AppContainer>
          <Provider {...stores}>
            <NextRouter />
          </Provider>
        </AppContainer>,
        rootElement
      );
    });
  }
} else {
  ReactDOM.render(
    <Router />,
    rootElement
  );
}
