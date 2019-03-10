import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import TopStoriesNav from './TopStoriesNav';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <TopStoriesNav />
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
