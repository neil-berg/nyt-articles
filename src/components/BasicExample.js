import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topstories">TopStories</Link>
          </li>
          <li>
            <Link to="/criticspicks">Critics Picks</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/topstories" component={TopStories} />
        <Route exact path="/criticspicks" component={CriticsPicks} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function CriticsPicks() {
  return (
    <div>
      <h2>CriticsPicks</h2>
    </div>
  );
}

function TopStories({ match }) {
  return (
    <div>
      <h2>Top Stories</h2>
      <ul>
        <li>
          <Link to={`${match.url}/arts`}>Arts</Link>
        </li>
        <li>
          <Link to={`${match.url}/business`}>Business</Link>
        </li>
        <li>
          <Link to={`${match.url}/politics`}>Politics</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:sectionId`} component={Section} />
    </div>
  );
}

function Section({ match }) {
  return (
    <div>
      <h3>{match.params.sectionId}</h3>
    </div>
  );
}

export default BasicExample;
