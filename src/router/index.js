import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import onlyAuth from 'hocs/onlyAuth';
import Layout from 'components/Layout';

import Home from './Home';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Board from './Board';

const HomeRedirect = <Redirect to="/" />;

export const routes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/board',
    name: 'Board',
    component: onlyAuth(HomeRedirect)(Board)
  }
];

let DevTool = null;
if (process.env.NODE_ENV === 'development') {
  const MobXDevTools = require('mobx-react-devtools').default; // eslint-disable-line global-require
  DevTool = <MobXDevTools position={{ bottom: 0, right: 20 }} />;
}

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
        {DevTool}
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
