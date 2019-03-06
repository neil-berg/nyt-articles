import React from 'react';
import styled from 'styled-components';

const MovieWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  grid-gap: 1em;
  justify-content: center;
`;

const MovieItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas:
    'author image'
    'title image'
    'dateURL image'
    'abstract image';
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;

  > p,
  a {
    margin: 0;
    padding: 0.5em 0.5em;
  }
  p.byline {
    grid-area: author;
    font-size: 0.65em;
    color: grey;
    font-weight: bold;
  }
  p.title {
    grid-area: title;
    font-size: 0.75em;
    font-weight: bold;
  }
  p.dateURL {
    grid-area: dateURL;
    font-size: 0.65em;
    color: grey;
  }
  p.abstract {
    grid-area: abstract;
    font-size: 0.75em;
  }
  a {
    font-size: 1em;
    color: grey;
    text-decoration: none;
    margin: 0;
    border-bottom: 1px solid grey;
    padding: 0 0 2px 0;
    transition: all 0.3s;
  }
  a:hover {
    color: black;
    border-bottom: 1px solid black;
  }
  img {
    grid-area: image;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.25em 0em;
    align-self: center;
  }
`;
const MovieList = ({ movies }) => {
  const renderedList = movies.map(movie => {
    return (
      <MovieItem key={movie.display_title}>
        <p className="byline">{movie.byline}</p>
        <p className="title">{movie.headline}</p>
        <p className="dateURL">
          {movie.publication_date} |{' '}
          <a href={movie.link.url} target="_blank" rel="noopener noreferrer">
            Read full review
          </a>
        </p>
        <p className="abstract">{movie.summary_short}</p>
        <img src={movie.multimedia ? movie.multimedia.src : ''} alt="" />
      </MovieItem>
    );
  });
  return <MovieWrapper>{renderedList}</MovieWrapper>;
};
export default MovieList;
