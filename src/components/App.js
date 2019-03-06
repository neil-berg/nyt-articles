import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import Landing from './Landing';
import Spinner from './Spinner';
import SectionSearch from './SectionSearch';
import SectionStories from './SectionStories';
import MoviesCriticsPicks from './MoviesCriticsPicks';
import MoviesUserSearch from './MoviesUserSearch';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';
import { formatTitle } from '../helpers';

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
      this.fetchArticles(section, label);
    }
    // Initial fetch of critic's movie picks
    this.fetchCriticsPicksMovies();
  }

  fetchArticles = async (section, label) => {
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

  fetchCriticsPicksMovies = async () => {
    const url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const criticsPicksMovies = await json.results;
    this.setState({ criticsPicksMovies, isLoading: false });
  };

  fetchUserSearchMovies = async (e, title) => {
    e.preventDefault();
    this.setState({ movieTitle: title, isLoading: true });
    const formattedTitle = formatTitle(title);
    const url = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${formattedTitle}&api-key=${KEY}`;
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    const userSearchMovies = await json.results;
    this.setState({ userSearchMovies, isLoading: false });
  };

  // Move to the next section by fetching new
  // articles and updating state with them
  showNextSection = (nextSection, nextLabel) => {
    this.fetchArticles(nextSection, nextLabel);
  };

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
      <div className="wrapper">
        <HeaderLogo />
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route
              exact
              path="/topstories"
              render={props => (
                <SectionSearch {...props} fetchArticles={this.fetchArticles} />
              )}
            />
            <Route
              exact
              path={`/topstories/${this.state.section}`}
              render={props =>
                this.state.isLoading ? (
                  <Spinner text="Loading articles" />
                ) : (
                  <SectionStories
                    {...props}
                    section={this.state.section}
                    label={this.state.label}
                    stories={this.state.stories}
                    showMore={this.state.showMore}
                    showNextSection={this.showNextSection}
                    showMoreStories={this.showMoreStories}
                  />
                )
              }
            />
            <Route
              exact
              path="/movies/criticspicks"
              render={props => (
                <MoviesCriticsPicks
                  {...props}
                  isLoading={this.state.isLoading}
                  movies={this.state.criticsPicksMovies}
                />
              )}
            />
            <Route
              exact
              path="/movies/search/"
              render={props => (
                <MoviesUserSearch
                  {...props}
                  isLoading={this.state.isLoading}
                  fetchUserSearchMovies={this.fetchUserSearchMovies}
                  movies={this.state.userSearchMovies}
                />
              )}
            />
            <Route
              exact
              path={`/movies/search/${formatTitle(this.state.movieTitle)}`}
              render={props => (
                <MoviesUserSearch
                  {...props}
                  isLoading={this.state.isLoading}
                  fetchUserSearchMovies={this.fetchUserSearchMovies}
                  movies={this.state.userSearchMovies}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
