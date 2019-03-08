import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
// import HeaderLogo from './HeaderLogo';
import TopStories from './TopStories';
import NavBar from './NavBar';
import Home from './Home';
import TopStoriesSection from './TopStoriesSection';
// import TopStoriesSearch from './TopStoriesSearch';
import { KEY } from '../apis/nyt';
// import { formatTitle } from '../helpers';

class App extends React.Component {
  state = {
    section: '',
    label: '',
    movieTitle: '',
    stories: [],
    moreStories: [],
    criticsPicksMovies: [],
    userSearchMovies: [],
    isLoading: false,
    showMore: false
  };

  componentDidMount() {
    const { section, label } = JSON.parse(localStorage.getItem('nytdata'));
    // Initial fetch of top stories
    if (section && label) {
      this.setState({ section, label });
      this.fetchTopStories(section, label);
    }
    // Initial fetch of critic's movie picks
    // this.fetchCriticsPicksMovies();
  }

  fetchTopStories = async (section, label) => {
    // Show spinner while articles load articles load
    this.setState({ section, label, isLoading: true, showMore: false });

    // Await the fetched articles
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const allStories = await json.results;
    const stories = allStories.slice(0, 10);
    const moreStories = allStories.slice(10, 20);

    // Load stories in state, stop spinner, and show stories
    this.setState({ stories, moreStories, isLoading: false });

    // Retain user selection for local persistence
    localStorage.setItem(
      'nytdata',
      JSON.stringify({ section: this.state.section, label: this.state.label })
    );
  };

  // fetchCriticsPicksMovies = async () => {
  //   const url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${KEY}`;
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   const criticsPicksMovies = await json.results;
  //   this.setState({ criticsPicksMovies, isLoading: false });
  // };

  // fetchUserSearchMovies = async (e, title) => {
  //   e.preventDefault();
  //   this.setState({ movieTitle: title, isLoading: true });
  //   const formattedTitle = formatTitle(title);
  //   const url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${formattedTitle}&api-key=${KEY}`;
  //   console.log(url);
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   const userSearchMovies = await json.results;
  //   this.setState({ userSearchMovies, isLoading: false });
  // };

  // Move to the next section by fetching new
  // articles and updating state with them
  // showNextSection = (nextSection, nextLabel) => {
  //   this.fetchArticles(nextSection, nextLabel);
  // };

  // Reveal more articles for a given section
  // by appending 10 more stories in state
  showMoreStories = e => {
    e.preventDefault();
    this.setState(prevState => ({
      stories: [...prevState.stories, ...prevState.moreStories],
      showMore: true
    }));
  };

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route
            path="/topstories"
            render={props => (
              <TopStories {...props} fetchTopStories={this.fetchTopStories} />
            )}
          />
          <Route
            path={'/topstories/:sectionId'}
            render={props => (
              <TopStoriesSection
                {...props}
                isLoading={this.state.isLoading}
                stories={this.state.stories}
                label={this.state.label}
                showMore={this.state.showMore}
                showMoreStories={this.showMoreStories}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
