import React from 'react';
import { Link } from 'react-router-dom';
import TopStoriesNav from './TopStoriesNav';
import Footer from './Footer';

const Home = props => {
  return (
    <div>
      <TopStoriesNav windowWidth={props.windowWidth} />
      <section>
        <Link to="/movies">Movie Reviews</Link>
      </section>
      <section>
        <Link to="/books">Book Reviews</Link>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
