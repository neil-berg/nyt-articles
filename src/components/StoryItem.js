import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { hoursAgo } from '../helpers';

const Story = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-areas:
    'author date'
    'title title'
    'abstract image'
    'links image';
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

  div.links {
    grid-area: links;
    align-self: end;
    display: flex;
    align-items: center;
    padding: 0.35em 0.35em;
  }

  div.links .icon {
    font-size: 14px;
    transition: color 0.2s;
  }

  div.links a.url {
    text-decoration: none;
    color: black;
    font-size: 0.7em;
    padding-left: 1em;
    transition: all 0.3s;
  }

  div.links a.url:hover {
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
      <p className="byline">{story.byline.replace(/by/gi, '').trim()}</p>
      <p className="date">{dateStr}</p>
      <p className="title">{story.title}</p>
      <p className="abstract">{story.abstract}</p>
      {storyType === 'topStory' ? (
        <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      ) : (
        <img src={story.media[0]['media-metadata'][0].url} alt="" />
      )}
      <div className="links">
        <FontAwesomeIcon
          icon={faBookmark}
          className="icon"
          color={inBookmarks ? '#f4aa42' : 'grey'}
          onClick={() => handleBookmarkClick(story)}
        />
        <a
          className="url"
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read full story
        </a>
      </div>
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
