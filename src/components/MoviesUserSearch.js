import React from 'react';
import { Link } from 'react-router-dom';

import Title from './Title';
import NavBar from './NavBar';
import NavItem from './NavItem';
import MovieSearchBar from './MovieSearchBar';
import Spinner from './Spinner';
import MovieList from './MovieList';

const MoviesUserSearch = ({ isLoading, fetchUserSearchMovies, movies }) => {
  return (
    <React.Fragment>
      <NavBar>
        <NavItem>
          <Link to="/">Return to home page</Link>
        </NavItem>
      </NavBar>
      <Title text="Movie Reviews" />
      <MovieSearchBar fetchUserSearchMovies={fetchUserSearchMovies} />
      {/* {movies.length > 0 ? <MovieList movies={movies} /> : null} */}
      {isLoading ? (
        <Spinner text="Loading movies" />
      ) : (
        <MovieList movies={movies} />
      )}
    </React.Fragment>
  );
};

export default MoviesUserSearch;
