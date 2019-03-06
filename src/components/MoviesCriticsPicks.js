import React from 'react';
import { Link } from 'react-router-dom';

import Title from './Title';
import SubTitle from './SubTitle';
import NavBar from './NavBar';
import NavItem from './NavItem';
import Spinner from './Spinner';
import MovieList from './MovieList';

const MoviesCriticsPicks = ({ movies, isLoading }) => {
  return (
    <React.Fragment>
      <NavBar>
        <NavItem>
          <Link to="/">Return to home page</Link>
        </NavItem>
      </NavBar>
      <Title text="Movie Reviews" />
      <SubTitle text="Critic's Picks" />
      {isLoading ? (
        <Spinner text="Loading movies" />
      ) : (
        <MovieList movies={movies} />
      )}
    </React.Fragment>
  );
};

export default MoviesCriticsPicks;
