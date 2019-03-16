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
    movieReviews: [],
    storyBookmarks: [],
    movieBookmarks: [],
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

  handleStoryBookmarkClick = entry => {
    this.setState(prevState => {
      // Check to see if entry (via its URL) already exists
      // If so, remove it from the state (i.e. user unchecks bookmark) and turn icon color grey
      // If not, add it to the bookmarks and turn icon color blue
      let storyBookmarks = prevState.storyBookmarks;
      const entryExists = storyBookmarks.find(item => item.url === entry.url);
      if (entryExists) {
        storyBookmarks = storyBookmarks.filter(item => item.url !== entry.url);
      } else {
        storyBookmarks = [...storyBookmarks, entry];
      }
      return {
        storyBookmarks
      };
    });
  };

  handleMovieBookmarkClick = entry => {
    this.setState(prevState => {
      // Check to see if entry (via its URL) already exists
      // If so, remove it from the state (i.e. user unchecks bookmark) and turn icon color grey
      // If not, add it to the bookmarks and turn icon color blue
      let movieBookmarks = prevState.movieBookmarks;
      const entryExists = movieBookmarks.find(
        item => item.link.url === entry.link.url
      );
      if (entryExists) {
        movieBookmarks = movieBookmarks.filter(
          item => item.link.url !== entry.link.url
        );
      } else {
        movieBookmarks = [...movieBookmarks, entry];
      }
      return {
        movieBookmarks
      };
    });
  };

  // handleRemoveBookmark = story => {
  //   this.setState(prevState => {
  //     const bookmarks = prevState.bookmarks.filter(
  //       item => item.url !== story.url
  //     );
  //     return {
  //       bookmarks
  //     };
  //   });
  // };

  render() {
    return (
      <Router>
        <div>
          <Header
            storyBookmarks={this.state.storyBookmarks}
            movieBookmarks={this.state.movieBookmarks}
          />
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
                  handleStoryBookmarkClick={this.handleStoryBookmarkClick}
                  handleMovieBookmarkClick={this.handleMovieBookmarkClick}
                  storyBookmarks={this.state.storyBookmarks}
                  movieBookmarks={this.state.movieBookmarks}
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
                  handleRemoveBookmark={this.handleRemoveBookmark}
                  storyBookmarks={this.state.storyBookmarks}
                  movieBookmarks={this.state.movieBookmarks}
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
