import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import TopStories from './TopStories';
import Bookmarks from './Bookmarks';
import NotFound from './NotFound';

class App extends React.Component {
  state = {
    windowWidth: null,
    popularStories: [],
    bookmarks: [],
    movieReviews: [],
    nonfictionBooks: [],
    fictionBooks: []
  };

  componentDidMount() {
    const innerWidth = window.innerWidth;
    this.setState({ windowWidth: innerWidth });
    window.addEventListener('resize', this.handleResize);
    this.fetchPopularStories();
    this.fetchMovieReviews();
    this.fetchNonfictionBooks();
    this.fetchFictionBooks();
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
    this.setState({ popularStories, isLoading: false });
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
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json?api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const nonfictionBooks = await json.results.books;
    this.setState({ nonfictionBooks, isLoading: false });
  };

  fetchFictionBooks = async () => {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${
      process.env.REACT_APP_API_KEY
    }`;
    const response = await fetch(url);
    const json = await response.json();
    const fictionBooks = await json.results.books;
    this.setState({ fictionBooks, isLoading: false });
  };

  handleBookmarkClick = entry => {
    this.setState(prevState => {
      // Check to see if entry (via its URL) already exists
      // If so, remove it from the state (i.e. user unchecks bookmark) and turn icon color grey
      // If not, add it to the bookmarks and turn icon color blue
      let bookmarks = prevState.bookmarks;
      const entryExists = bookmarks.find(item => item.url === entry.url);
      if (entryExists) {
        bookmarks = bookmarks.filter(item => item.url !== entry.url);
      } else {
        bookmarks = [...bookmarks, entry];
      }
      return {
        bookmarks
      };
    });
  };

  handleRemoveBookmark = story => {
    this.setState(prevState => {
      const bookmarks = prevState.bookmarks.filter(
        item => item.url !== story.url
      );
      return {
        bookmarks
      };
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Header bookmarks={this.state.bookmarks} />
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
                  fictionBooks={this.state.fictionBooks}
                  handleBookmarkClick={this.handleBookmarkClick}
                  bookmarks={this.state.bookmarks}
                />
              )}
            />
            <Route
              path="/topstories/:sectionId"
              render={props => (
                <TopStories
                  {...props}
                  windowWidth={this.state.windowWidth}
                  handleBookmarkClick={this.handleBookmarkClick}
                  bookmarks={this.state.bookmarks}
                />
              )}
            />
            <Route
              exact
              path="/bookmarks/"
              render={props => (
                <Bookmarks
                  {...props}
                  bookmarks={this.state.bookmarks}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                />
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
