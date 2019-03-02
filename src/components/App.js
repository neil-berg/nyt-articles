import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HeaderLogo from './HeaderLogo';
import Landing from './Landing';
import SectionSearch from './SectionSearch';
import SectionStories from './SectionStories';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';

class App extends React.Component {
  state = {
    section: '',
    label: '',
    stories: []
  };

  // componentDidMount() {
  //   this.fetchArticles(this.state.section, this.state.label);
  // }

  fetchArticles = async (section, label) => {
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const stories = await json.results.slice(0, 5);
    this.setState({ section, label, stories });
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
              path="/topstories/:section"
              render={props => (
                <SectionStories
                  {...props}
                  label={this.state.label}
                  stories={this.state.stories}
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
