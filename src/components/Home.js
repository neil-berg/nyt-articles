import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFireAlt } from '@fortawesome/free-solid-svg-icons';
import TopStoriesNav from './TopStoriesNav';
import StoryItem from './StoryItem';

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;

const Home = ({ windowWidth, popularStories }) => {
  const storyItems = popularStories
    .slice(0, 8)
    .map(story => (
      <StoryItem key={story.title} story={story} storyType="mostPopular" />
    ));
  return (
    <div>
      <TopStoriesNav windowWidth={windowWidth} />
      <section className="popular">
        <h2 style={{ textAlign: 'center' }}>Most Viewed Stories This Week</h2>
        <StoryWrapper>{storyItems}</StoryWrapper>
      </section>
      <section className="movies">
        <Link to="/movies">Movie Reviews</Link>
      </section>
      <section className="books">
        <Link to="/books">Book Reviews</Link>
      </section>
    </div>
  );
};

export default Home;
