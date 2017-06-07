import React from 'react';
import { Link } from 'react-router-dom';

import Login from './Login';

function Intro() {
  return (
    <div>
      Intro stuff
      <Login />
      <Link to="/about">About</Link>
      <Link to="/logout">Logout</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
}

export default Intro;
