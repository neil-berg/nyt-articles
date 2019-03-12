import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { hoursAgo } from '../helpers';

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px lightgrey solid;
  letter-spacing: 0.1px;

  > p,
  a {
    margin: 0;
  }

  .byline-date {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .byline-date p.byline {
    font-size: 0.65em;
    color: grey;
    font-weight: bold;
  }
  .byline-date p.date {
    font-size: 0.65em;
    color: grey;
  }
  p.title {
    font-size: 1em;
    color: black
    font-weight: bold;
    text-align: center;
    padding-bottom: 0.35em;
  }
  p.abstract {
    font-size: 0.75em;
  }

  a.url {
    font-size: 0.7em;
    text-align: center;
    padding: 0.35em 0em;
    justify-self: flex-end;
    color: grey;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
  }
  a.url:hover {
    color: #2a78f7;
  }
  img {
    display: block;
    width: 100%;
    margin: 0;
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
      <p className="title">{movie.display_title}</p>
      <img src={movie.multimedia.src} alt="" />
      <div className="byline-date">
        <p className="byline">{movie.byline.replace(/by/gi, '').trim()}</p>
        <p className="date">{dateStr}</p>
      </div>
      <p className="abstract">{movie.summary_short}</p>
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
