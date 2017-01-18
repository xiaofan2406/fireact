import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import 'utils/firebase';
import { loadLogin } from 'utils/storage';

import AppRouter from './router';
import createStore from './store';


const stores = createStore({
  userStore: loadLogin()
});

const rootElement = document.getElementById('root');

useStrict(true);


ReactDOM.render(
  <AppContainer>
    <Provider {...stores}>
      <AppRouter />
    </Provider>
  </AppContainer>,
  rootElement
);

// react-hot-loader setup
if (module.hot) {
  module.hot.accept('./router', () => {
    const NextAppRouter = require('./router').default; // eslint-disable-line
    ReactDOM.render(
      <AppContainer>
        <Provider {...stores}>
          <NextAppRouter />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
