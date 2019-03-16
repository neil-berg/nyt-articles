import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

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
  border-top: 1px grey solid;
  border-bottom: 1px grey solid;

  a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    transition: all 0.3s;
    padding-top: 0.75em;
  }

  a:hover {
    color: #2a78f7;
  }

  p {
    font-size: 0.85em;
  }

  .remove {
    margin-top: auto;
    padding-bottom: 0.5em;
    transition: color 0.3s;
    color: grey;
  }

  .remove:hover {
    color: #f24624;
  }

  .remove .remove__icon {
    font-size: 20px;
  }

  .remove span.remove__text {
    padding-left: 0.5em;
    font-size: 0.8em;
  }
`;

const Bookmarks = ({
  storyBookmarks,
  movieBookmarks,
  handleRemoveBookmark
}) => {
  const bookmarkList = [...storyBookmarks, ...movieBookmarks].map(bookmark => {
    return (
      <BookmarkStory key={bookmark.url || bookmark.link.url}>
        <a href={bookmark.url || bookmark.link.url}>
          {bookmark.title || bookmark.display_title}
        </a>
        <p>{bookmark.abstract || bookmark.summary_short}</p>
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
      <h2 style={{ textAlign: 'center' }}>Bookmarks</h2>
      <BookmarkSection>{bookmarkList}</BookmarkSection>
    </div>
  );
};

Bookmarks.propTypes = {
  bookmarkedStories: PropTypes.array.isRequired
};

export default Bookmarks;
