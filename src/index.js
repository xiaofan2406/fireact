import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import { loginCacher, boardCacher, serviceWorker } from 'utils';

import Router from './Router';
import createStore from './store';

const stores = createStore({
  userStore: loginCacher.load(),
  boardStore: boardCacher.load()
});

useStrict(true);

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const AppContainer = require('react-hot-loader').AppContainer;

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider {...stores}>
          <Router />
        </Provider>
      </AppContainer>,
      rootElement
    );
  };

  render();

  if (module.hot) {
    module.hot.accept('./Router', render);
  }
} else {
  ReactDOM.render(
    <Provider {...stores}>
      <Router />
    </Provider>,
    rootElement
  );
  serviceWorker();
}
