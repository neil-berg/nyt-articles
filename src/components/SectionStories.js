import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import { sections } from '../SectionsArray';
import { hoursAgo } from '../helpers';

// const NavContainer = styled.ul`
//   display: flex;
//   justify-content: center;
//   list-style-type: none;
//   margin: 0;
//   padding: 0;
// `;

const NavItem = styled.li`
  margin: 1em 0.5em 0.5em 0.5em;
  padding: 0;
  font-size: 0.8em;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  :hover {
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.2);
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(1.05);
  }

  a {
    color: black;
    text-align: center;
    text-decoration: none;
    padding: 0.25em 1em;
    display: block;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.75em;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  grid-gap: 1em;
  justify-content: center;
`;

const StoryItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas:
    'author image'
    'title image'
    'dateURL image '
    'abstract image';
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;

  > p,
  a {
    margin: 0;
    padding: 0.5em 0.5em;
  }
  p:nth-child(1) {
    grid-area: author;
    font-size: 0.65em;
    color: grey;
    font-weight: bold;
  }
  p:nth-child(2) {
    grid-area: title;
    font-size: 0.75em;
    font-weight: bold;
  }
  p:nth-child(3) {
    grid-area: dateURL;
    font-size: 0.65em;
    color: grey;
  }
  p:nth-child(4) {
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

const SectionStories = ({ section, label, stories, handleNextClick }) => {
  const currentIndex = sections.findIndex(item => item.section === section);
  // If currently on last section, set the next section to the zeroth index
  const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
  const { section: nextSection, label: nextLabel } = sections[nextIndex];

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
        <p>{story.byline.replace(/by/gi, '').trim()}</p>
        <p>{story.title}</p>
        <p>
          {dateStr} |{' '}
          <a href={story.url} target="_blank" rel="noopener noreferrer">
            Read full story
          </a>
        </p>
        <p>{story.abstract}</p>
        <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      </StoryItem>
    );
  });

  return (
    <div>
      <NavBar>
        <NavItem>
          <Link to="/topstories">⬅️ New Search</Link>
        </NavItem>
        <NavItem onClick={() => handleNextClick(nextSection, nextLabel)}>
          <Link to={`/topstories/${nextSection}`}>Next Section ➡️ </Link>
        </NavItem>
      </NavBar>
      <Title>{label}</Title>
      <StoryWrapper>{renderedList}</StoryWrapper>
    </div>
  );
};

SectionStories.propTypes = {
  section: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  stories: PropTypes.array.isRequired,
  handleNextClick: PropTypes.func.isRequired
};

export default SectionStories;
