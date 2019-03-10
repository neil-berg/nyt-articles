import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TopStoriesNav from './TopStoriesNav';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'popular popular'
    'movies books';

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'popular'
      'movies'
      'books';
  }

  section.popular {
    grid-area: popular;
  }

  section.movies {
    grid-area: movies;
  }

  section.movies {
    grid-area: books;
  }
`;

const Home = props => {
  return (
    <div>
      <TopStoriesNav windowWidth={props.windowWidth} />
      <GridContainer>
        <section className="popular">
          <h2>Popular Stories</h2>
        </section>
        <section className="movies">
          <Link to="/movies">Movie Reviews</Link>
        </section>
        <section className="books">
          <Link to="/books">Book Reviews</Link>
        </section>
      </GridContainer>
    </div>
  );
};

export default Home;
