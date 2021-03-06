import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import TopStoriesNav from './TopStoriesNav';
import StoryItem from './StoryItem';
import Spinner from './Spinner';
import { sections } from '../SectionsArray';

const SectionTitle = styled.h2`
  text-align: center;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.2);
  font-size: 2em;
`;

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background: black;
  color: white;
  padding: 0.75em;
  margin: 1em 1em;
  font-size: 0.75em;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;

  :hover {
    background: white;
    color: black;
  }
`;

class TopStories extends React.Component {
  state = {
    section: '',
    label: '',
    stories: [],
    moreStories: [],
    isLoading: false,
    showMore: true
  };

  componentDidMount() {
    const section = this.props.match.params.sectionId;
    this.fetchStories(section);
  }

  componentDidUpdate(prevProps) {
    const oldSection = prevProps.match.params.sectionId;
    const newSection = this.props.match.params.sectionId;
    if (oldSection !== newSection) {
      this.fetchStories(newSection);
      this.setState({ showMore: true });
    }
  }

  fetchStories = async section => {
    // Locate the matching label for this section and
    // Ssow spinner while articles load articles load
    const label = sections.filter(item => item.searchTerm === section)[0].label;
    this.setState({ section, label, isLoading: true });

    // Await the fetched articles
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const allStories = await json.results;
    const stories = allStories.slice(0, 10);
    const moreStories = allStories.slice(10);

    // Load stories in state, stop spinner, and show stories
    this.setState({ stories, moreStories, isLoading: false });
  };

  showMoreStories = () => {
    this.setState(prevState => ({
      showMore: false,
      stories: [...prevState.stories, ...prevState.moreStories]
    }));
  };

  render() {
    const storyItems = this.state.stories.map(story => (
      <StoryItem
        key={story.title}
        story={story}
        storyType="topStory"
        handleBookmarkClick={this.props.handleBookmarkClick}
        bookmarks={this.props.bookmarks}
      />
    ));
    return (
      <div>
        <TopStoriesNav windowWidth={this.props.windowWidth} />
        <SectionTitle>{this.state.label.toUpperCase()}</SectionTitle>
        {this.state.isLoading ? (
          <Spinner text="Loading articles" />
        ) : (
          <StoryWrapper>{storyItems}</StoryWrapper>
        )}
        {!this.state.isLoading && this.state.showMore ? (
          <ButtonContainer>
            <Button onClick={this.showMoreStories}>Show more stories</Button>
          </ButtonContainer>
        ) : null}
      </div>
    );
  }
}

TopStories.propTypes = {
  match: PropTypes.object.isRequired,
  windowWidth: PropTypes.number,
  handleBookmarkClick: PropTypes.func.isRequired,
  bookmarks: PropTypes.array.isRequired
};

export default TopStories;
