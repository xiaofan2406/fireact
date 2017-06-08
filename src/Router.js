import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { dynamic } from 'hocs';
import { Layout, Login } from 'components';
import { boardTypes } from 'constants';

let DevTool = null;
if (process.env.NODE_ENV === 'development') {
  const MobXDevTools = require('mobx-react-devtools').default;
  DevTool = <MobXDevTools position={{ bottom: 0, right: 20 }} />;
}

// TODO need to put path to a mobx store
function Router() {
  return (
    <BrowserRouter>
      <Layout>
        {Object.values(boardTypes).map(type =>
          <Route
            path={type.path}
            key={type.path}
            exact
            component={dynamic({
              importer: () =>
                import(/* webpackChunkName: "Board" */ './components/Board')
            })}
          />
        )}
        <Route path="/login" exact component={Login} />
        <Route
          path="/logout"
          exact
          component={dynamic({
            importer: () =>
              import(/* webpackChunkName: "Logout" */ './components/Logout')
          })}
        />
        <Route
          path="/about"
          exact
          component={dynamic({
            importer: () =>
              import(/* webpackChunkName: "About" */ './components/About')
          })}
        />
        <Route
          path="/contact"
          exact
          component={dynamic({
            importer: () =>
              import(/* webpackChunkName: "Contact" */ './components/Contact')
          })}
        />
        {DevTool}
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
