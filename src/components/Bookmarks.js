import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import TopStoriesNav from './TopStoriesNav';

const BookmarkSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
  margin: 1em auto;
`;

const BookmarkStory = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;

  a.bookmark__link {
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: all 0.3s;
    padding-top: 0.75em;
  }

  a.bookmark__link:hover {
    color: #2a78f7;
  }

  p.bookmark__abstract {
    font-size: 0.875em;
    color: #666;
  }

  .remove {
    margin-top: auto;
    padding-bottom: 0.5em;
    transition: color 0.3s;
    color: #666;
    cursor: pointer;
  }

  .remove:hover {
    color: #f24624;
  }

  .remove .remove__icon {
    font-size: 16px;
  }

  .remove span.remove__text {
    padding-left: 0.5em;
    font-size: 0.875em;
  }
`;

const Bookmarks = ({ windowWidth, bookmarks, handleRemoveBookmark }) => {
  const bookmarkList = bookmarks.map(bookmark => {
    return (
      <BookmarkStory key={bookmark.url}>
        <a className="bookmark__link" href={bookmark.url}>
          {bookmark.title}
        </a>
        <p className="bookmark__abstract">{bookmark.abstract}</p>
        <div className="remove" onClick={() => handleRemoveBookmark(bookmark)}>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            className="remove__icon"
          />
          <span className="remove__text">Remove article</span>
        </div>
      </BookmarkStory>
    );
  });
  return (
    <div>
      <TopStoriesNav windowWidth={windowWidth} />
      <h2 style={{ textAlign: 'center' }}>Bookmarks</h2>
      <BookmarkSection>{bookmarkList}</BookmarkSection>
    </div>
  );
};

Bookmarks.propTypes = {
  bookmarks: PropTypes.array.isRequired,
  windowWidth: PropTypes.number.isRequired
};

export default Bookmarks;
