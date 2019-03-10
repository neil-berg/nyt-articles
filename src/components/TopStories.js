import React from 'react';
import styled from 'styled-components';
import TopStoriesNav from './TopStoriesNav';
import StoryItem from './StoryItem';
import Spinner from './Spinner';
import { KEY } from '../apis/nyt';

const SectionTitle = styled.h1`
  text-align: center;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.2);
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

class TopStories extends React.Component {
  state = {
    section: '',
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
    // Show spinner while articles load articles load
    this.setState({ section, isLoading: true });

    // Await the fetched articles
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const allStories = await json.results;
    const stories = allStories.slice(0, 10);
    const moreStories = allStories.slice(10);

    // Load stories in state, stop spinner, and show stories
    this.setState({ stories, moreStories, isLoading: false });

    // Retain user selection for local persistence
    localStorage.setItem(
      'nytdata',
      JSON.stringify({ section: this.state.section })
    );
  };

  showMoreStories = () => {
    this.setState(prevState => ({
      showMore: false,
      stories: [...prevState.stories, ...prevState.moreStories]
    }));
  };

  render() {
    const storyItems = this.state.stories.map(story => (
      <StoryItem key={story.title} story={story} />
    ));
    return (
      <div>
        <TopStoriesNav />
        <SectionTitle>
          {this.props.match.params.sectionId.toUpperCase()}
        </SectionTitle>
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

export default TopStories;