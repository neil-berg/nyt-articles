import React from 'react';
import { Link } from 'react-router-dom';

const TopStoriesNav = () => {
  return (
    <div>
      <p>Top Stories</p>
      <nav>
        <ul>
          <li>
            <Link to="/topstories/arts">Arts</Link>
          </li>
          <li>
            <Link to="/topstories/politics">Politics</Link>
          </li>
          <li>
            <Link to="/topstories/sports">Sports</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TopStoriesNav;
