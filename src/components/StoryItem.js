import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { hoursAgo } from '../helpers';

const Story = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas:
    'author date'
    'title title'
    'abstract image'
    'url image';
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  margin: 1em 0;
  border-radius: 5px;
  background: #3c3c3c;
  color: white;
  font-size: 1em;
  font-weight: 200;
  cursor: pointer;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  :hover,
  :focus {
    background: #2a2a2a;
  }
`;

const StoryItem = ({ story }) => {
  let dateStr = '';
  const numHours = hoursAgo(story.published_date);
  if (numHours > 24) {
    const numDays = Math.ceil(numHours / 24);
    dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
  } else {
    dateStr = numHours > 1 ? `${numHours} hours ago` : '1 hour ago';
  }
  return (
    <Story>
      <p className="byline">{story.byline.replace(/by/gi, '').trim()}</p>
      <p className="date">{dateStr}</p>
      <p className="title">{story.title}</p>
      <p className="abstract">{story.abstract}</p>
      <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      <a
        className="url"
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read full story
      </a>
    </Story>
  );
};

// SectionStories.propTypes = {
//   section: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   stories: PropTypes.array.isRequired,
//   handleNextClick: PropTypes.func.isRequired,
//   showMoreStories: PropTypes.func.isRequired
// };

export default StoryItem;
