import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import TopStories from './TopStories';
import NotFound from './NotFound';

class App extends React.Component {
  state = {
    windowWidth: null,
    popularStories: [],
    movieReviews: [],
    nonfictionBooks: []
  };

  componentDidMount() {
    const innerWidth = window.innerWidth;
    this.setState({ windowWidth: innerWidth });
    window.addEventListener('resize', this.handleResize);
    this.fetchPopularStories();
    this.fetchMovieReviews();
    this.fetchNonfictionBooks();
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const innerWidth = window.innerWidth;
    this.setState(prevState => ({ windowWidth: innerWidth }));
  };

  fetchPopularStories = async () => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const popularStories = await json.results;
    this.setState({ popularStories });
  };

  fetchMovieReviews = async () => {
    const url = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const movieReviews = await json.results;
    this.setState({ movieReviews, isLoading: false });
  };

  fetchNonfictionBooks = async () => {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const nonfictionBooks = await json.results.books;
    this.setState({ nonfictionBooks, isLoading: false });
  };

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  windowWidth={this.state.windowWidth}
                  popularStories={this.state.popularStories}
                  movieReviews={this.state.movieReviews}
                  nonfictionBooks={this.state.nonfictionBooks}
                />
              )}
            />
            <Route
              path="/topstories/:sectionId"
              render={props => (
                <TopStories {...props} windowWidth={this.state.windowWidth} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
