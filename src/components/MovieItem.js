import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { hoursAgo } from '../helpers';

const Movie = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'author date'
    'title title'
    'abstract image'
    'url .';
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;
  letter-spacing: 0.1px;

  > p,
  a {
    margin: 0;
    padding: 0.35em 0.35em;
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
    color: black
    font-weight: bold;
  }
  p.date {
    grid-area: date;
    font-size: 0.65em;
    color: grey;
    text-align: right;
  }
  p.abstract {
    grid-area: abstract;
    font-size: 0.75em;
  }

  a.url {
    grid-area: url;
    font-size: 0.7em;
    color: grey;
    text-decoration: none;
    transition: all 0.3s;
    align-self: end;
  }
  a.url:hover {
    color: #2a78f7;
  }
  img {
    grid-area: image;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.25em 0em;
    align-self: top;
  }
`;

const MovieItem = ({ movie }) => {
  let dateStr = '';
  const numHours = hoursAgo(movie.publication_date);
  if (numHours > 24) {
    const numDays = Math.ceil(numHours / 24);
    dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
  } else {
    dateStr = numHours > 1 ? `${numHours} hours ago` : '1 hour ago';
  }

  return (
    <Movie>
      <p className="byline">{movie.byline.replace(/by/gi, '').trim()}</p>
      <p className="date">{dateStr}</p>
      <p className="title">{movie.display_title}</p>
      <p className="abstract">{movie.summary_short}</p>
      <img src={movie.multimedia.src} alt="" />
      <a
        className="url"
        href={movie.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read full review
      </a>
    </Movie>
  );
};

// SectionStories.propTypes = {
//   section: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   stories: PropTypes.array.isRequired,
//   handleNextClick: PropTypes.func.isRequired,
//   showMoreStories: PropTypes.func.isRequired
// };

export default MovieItem;
