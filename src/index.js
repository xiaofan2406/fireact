import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';
import 'utils/firebase';
import { loadLogin, loadBoardCache } from 'utils/storage';

import Router from './router';
import createStore from './store';

const stores = createStore({
  userStore: loadLogin(),
  boardStore: loadBoardCache()
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
    module.hot.accept('./router', render);
  }
} else {
  ReactDOM.render(
    <Provider {...stores}>
      <Router />
    </Provider>,
    rootElement
  );
}
