import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import Landing from './Landing';
import Spinner from './Spinner';
import SectionSearch from './SectionSearch';
import SectionStories from './SectionStories';
import MovieSearch from './MovieSearch';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';

class App extends React.Component {
  state = {
    section: '',
    label: '',
    stories: [],
    moreStories: [],
    isLoading: false,
    showMore: false
  };

  componentDidMount() {
    const { section, label } = JSON.parse(localStorage.getItem('nytdata'));
    if (section && label) {
      this.setState({ section, label });
      this.fetchArticles(section, label);
    }
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
            <Route exact path="/movies" render={props => <MovieSearch />} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
