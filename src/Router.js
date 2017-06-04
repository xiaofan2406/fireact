import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { withLogin } from 'hocs';
import { Layout, Board, About, Login, Logout, Intro } from 'components';

const AuthenticatedBoard = withLogin({ fallback: Intro })(Board);

let DevTool = null;
if (process.env.NODE_ENV === 'development') {
  const MobXDevTools = require('mobx-react-devtools').default;
  DevTool = <MobXDevTools position={{ bottom: 0, right: 20 }} />;
}

function Router() {
  return (
    <BrowserRouter>
      <Layout>
        <Route path="/" exact component={AuthenticatedBoard} />
        <Route path="/inbox" exact component={AuthenticatedBoard} />
        <Route path="/trash" exact component={AuthenticatedBoard} />
        <Route path="/login" exact component={Login} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/about" exact component={About} />
        {DevTool}
      </Layout>
    </BrowserRouter>
  );
}

export default Router;
