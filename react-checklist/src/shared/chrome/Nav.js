import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/react-classic">React Classic</Link>
          <Link to="/react-hooks">React Hooks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
