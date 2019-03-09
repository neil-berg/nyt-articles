import React from 'react';
import { Link } from 'react-router-dom';
import TopStoriesNav from './TopStoriesNav';
import MovieReviews from './MovieReviews';
import BookReviews from './BookReviews';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <TopStoriesNav />
      <section>
        <MovieReviews />
      </section>
      <section>
        <BookReviews />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
