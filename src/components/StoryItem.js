import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { hoursAgo } from '../helpers';

const Story = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'header '
    'image'
    'byline '
    'title '
    'abstract';
  border-bottom: 1px lightgrey solid;
  padding: 0 0.5em;

  .header {
    grid-area: header;
    align-self: start;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0;
  }

  .header .header__icon {
    font-size: 1.25em;
    cursor: pointer;
  }

  .header .header__date {
    font-size: 0.75em;
    color: #666;
  }

  .byline {
    grid-area: byline;
    color: #666;
    font-size: 0.75em;
    margin: 0;
    padding-top: 0.25em;
  }

  .title {
    grid-area: title;
    font-weight: bold;
    font-size: 1em;
    margin: 0;
    padding: 0.5em 0;
  }

  .abstract {
    grid-area: abstract;
    font-size: 0.875em;
    margin: 0;
    padding-bottom: 0.5em;
    color: #666;
  }

  img {
    grid-area: image;
    display: block;
    width: 100%;
    margin: 0;
    align-self: start;
  }
`;

const StoryItem = ({
  story,
  storyType,
  handleBookmarkClick,
  bookmarkedStories
}) => {
  // Format a date string as hours since curent time
  let dateStr = '';
  const numHours = hoursAgo(story.published_date);
  if (numHours > 24) {
    const numDays = Math.ceil(numHours / 24);
    dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
  } else {
    dateStr = numHours > 1 ? `${numHours} hours ago` : '1 hour ago';
  }

  // Determine whether this story exists in the bookmarked stories
  // and color the bookmark icon as such
  const inBookmarks = bookmarkedStories.find(item => item.url === story.url);

  return (
    <Story>
      <div className="header">
        <FontAwesomeIcon
          className="header__icon"
          icon={faBookmark}
          color={inBookmarks ? '#f4aa42' : 'grey'}
          onClick={() => handleBookmarkClick(story)}
        />
        <span className="header__date">{dateStr}</span>
      </div>
      {storyType === 'topStory' ? (
        <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      ) : (
        <img src={story.media[0]['media-metadata'][1].url} alt="" />
      )}
      <p className="byline">{story.byline.replace(/by/gi, '').trim()}</p>

      <p className="title">{story.title}</p>
      <p className="abstract">{story.abstract}</p>
    </Story>
  );
};

StoryItem.propTypes = {
  story: PropTypes.object.isRequired,
  storyType: PropTypes.string.isRequired,
  handleBookmarkClick: PropTypes.func.isRequired,
  bookmarkedStories: PropTypes.array.isRequired
};

export default StoryItem;
