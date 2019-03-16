import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { hoursAgo } from '../helpers';

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px lightgrey solid;
  padding: 0 0.5em;

  > p,
  a {
    margin: 0;
  }

  .byline {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 0.75em;
  }

  .byline .byline__icon {
    font-size: 1.5em;
    cursor: pointer;
  }

  .byline p.byline__author {
    color: #666;
  }

  .byline p.byline__date {
    color: #666;
  }

  p.title {
    font-size: 1em;
    color: black
    font-weight: bold;
    text-align: center;
    padding-bottom: 0.5em;
  }

  p.abstract {
    font-size: 0.875em;
    padding-bottom: 0.5em;
  }

  a.url {
    font-size: 0.7em;
    text-align: center;
    margin-top: auto;
    padding: 0.5em 0em;
    justify-self: flex-end;
    color: #666;
    text-decoration: none;
    transition: all 0.3s;
    cursor: pointer;
  }
  a.url:hover {
    color: #2a78f7;
  }

.imageContainer {
  overflow: hidden;
}

.imageContainer img {
    display: block;
    width: 100%;
    margin: 0;
    transition: all 0.3s ease-in;
}

.imageContainer:hover img {
  border-radius: 5px;
  transform: scale(1.25);
  filter: grayscale(25%);
}

`;

const MovieItem = ({ movie, handleMovieBookmarkClick, movieBookmarks }) => {
  let dateStr = '';
  const numHours = hoursAgo(movie.publication_date);
  if (numHours > 24) {
    const numDays = Math.ceil(numHours / 24);
    dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
  } else {
    dateStr = numHours > 1 ? `${numHours} hours ago` : '1 hour ago';
  }

  // Determine whether this movie exists in the bookmarked stories
  // and color the bookmark icon as such
  const inBookmarks = movieBookmarks.find(
    item => item.link.url === movie.link.url
  );

  return (
    <Movie>
      <p className="title">{movie.display_title}</p>
      <div className="imageContainer">
        <img src={movie.multimedia.src} alt="" />
      </div>
      <div className="byline">
        <FontAwesomeIcon
          className="byline__icon"
          icon={faBookmark}
          color={inBookmarks ? '#f4aa42' : 'grey'}
          onClick={() => handleMovieBookmarkClick(movie)}
        />
        <p className="byline__author">
          {movie.byline.replace(/by/gi, '').trim()}
        </p>
        <p className="byline__date">{dateStr}</p>
      </div>
      <p className="abstract">{movie.summary_short}</p>
      {/* <a
        className="url"
        href={movie.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read full review
      </a> */}
    </Movie>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired
};

export default MovieItem;
