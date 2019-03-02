import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <ul>
      <li>
        <Link to="/topstories">Top Stories</Link>
      </li>
    </ul>
  );
};

export default Landing;
