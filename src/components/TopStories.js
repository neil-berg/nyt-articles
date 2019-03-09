import React from 'react';
import TopStoriesNav from './TopStoriesNav';
import Spinner from './Spinner';
import { KEY } from '../apis/nyt';

class TopStories extends React.Component {
  state = {
    section: '',
    stories: [],
    moreStories: [],
    isLoading: false
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

  render() {
    const titles = this.state.stories.map(story => story.title);
    return (
      <div>
        <TopStoriesNav />
        <h2>{this.props.match.params.sectionId}</h2>
        {this.state.isLoading ? (
          <Spinner text="Loading articles" />
        ) : (
          <div>{titles}</div>
        )}
      </div>
    );
  }
}

export default TopStories;
