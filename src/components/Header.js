import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/topstories">Top Stories</Link>
    </li>
    <li>
      <Link to="/criticspicks">Critic's Picks</Link>
    </li>
  </ul>
);

export default Header;
