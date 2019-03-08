import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Spinner from './Spinner';
import { hoursAgo } from '../helpers';

const Title = styled.h1`
  text-align: center;
  font-size: 1.75em;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;

const StoryItem = styled.div`
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

const TopStoriesSection = ({
  isLoading,
  label,
  stories,
  showMore,
  showMoreStories
}) => {
  const renderedList = stories.map(story => {
    let dateStr = '';
    const numHours = hoursAgo(story.published_date);
    if (numHours > 24) {
      const numDays = Math.ceil(numHours / 24);
      dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
    } else {
      dateStr = numHours > 1 ? `${numHours} hours ago` : '1 hour ago';
    }
    return (
      <StoryItem key={story.title}>
        <p className="byline">{story.byline.replace(/by/gi, '').trim()}</p>
        <p className="title">{story.title}</p>
        <p className="dateURL">
          {dateStr} |{' '}
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            Read full story
          </a>
        </p>
        <p className="abstract">{story.abstract}</p>
        <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      </StoryItem>
    );
  });

  return (
    <div>
      <Title>{label}</Title>
      {isLoading ? (
        <Spinner text="Loading articles" />
      ) : (
        <React.Fragment>
          <StoryWrapper>{renderedList}</StoryWrapper>
          <ButtonContainer>
            <Button onClick={showMoreStories}>Show more stories</Button>
          </ButtonContainer>
        </React.Fragment>
      )}
    </div>
  );
};

// SectionStories.propTypes = {
//   section: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   stories: PropTypes.array.isRequired,
//   handleNextClick: PropTypes.func.isRequired,
//   showMoreStories: PropTypes.func.isRequired
// };

export default TopStoriesSection;
