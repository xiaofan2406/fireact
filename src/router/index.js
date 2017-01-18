/**
 * Root route config
 * @see https://react-router.now.sh/route-config
 */

import React from 'react';
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import Redirect from 'react-router/Redirect';

import onlyAuth from 'hocs/only-auth';

import Layout from 'components/Layout';
import Home from './Home';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Board from './Board';


const HomeRedirect = () => <Redirect to="/" />;

export const routes = [
  {
    pattern: '/',
    name: 'Home',
    exactly: true,
    component: Home
  },
  {
    pattern: '/about',
    name: 'About',
    component: About
  },
  {
    pattern: '/login',
    name: 'Login',
    component: Login
  },
  {
    pattern: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    pattern: '/board',
    name: 'Board',
    component: onlyAuth(HomeRedirect)(Board)
  }
];

let DevTool = null;
if (process.env.NODE_ENV === 'development') {
  const MobXDevTools = require('mobx-react-devtools').default; // eslint-disable-line global-require
  DevTool = <MobXDevTools position={{ bottom: 0, right: 20 }} />;
}


function AppRouter() {
  return (
    <Router>
      <Layout>
        {routes.map(route => (
          <Match
            key={route.pattern}
            pattern={route.pattern}
            exactly={route.exactly}
            component={route.component}
          />
        ))}
        <Miss component={HomeRedirect} />
        {DevTool}
      </Layout>
    </Router>
  );
}


export default AppRouter;
