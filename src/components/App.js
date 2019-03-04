import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import Landing from './Landing';
import Spinner from './Spinner';
import SectionSearch from './SectionSearch';
import SectionStories from './SectionStories';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';

class App extends React.Component {
  state = {
    section: '',
    label: '',
    stories: [],
    isLoading: false
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
    this.setState({ section, label, isLoading: true });

    // Await the fetched articles
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const stories = await json.results.slice(0, 9);

    // Load stories in state, stop spinner, and show stories
    this.setState({ stories, isLoading: false });

    // Retain user selection for local persistence
    localStorage.setItem(
      'nytdata',
      JSON.stringify({ section: this.state.section, label: this.state.label })
    );
  };

  handleNextClick = (nextSection, nextLabel) => {
    this.fetchArticles(nextSection, nextLabel);
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
                  <Spinner />
                ) : (
                  <SectionStories
                    {...props}
                    section={this.state.section}
                    label={this.state.label}
                    stories={this.state.stories}
                    handleNextClick={this.handleNextClick}
                  />
                )
              }
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
