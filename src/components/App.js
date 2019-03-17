import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import TopStories from './TopStories';
import Bookmarks from './Bookmarks';
import NotFound from './NotFound';
import base from '../base';

class App extends React.Component {
  state = {
    windowWidth: null,
    popularStories: [],
    movieReviews: [],
    nonfictionBooks: [],
    fictionBooks: [],
    bookmarks: []
  };

  componentDidMount() {
    // Populate bookmarks from local storage if any exist
    const localStorageRef = localStorage.getItem('bookmarks');
    if (localStorageRef) {
      this.setState({ bookmarks: JSON.parse(localStorageRef) });
    }

    // Adjust story nav on window width and fetch all data
    const innerWidth = window.innerWidth;
    this.setState({ windowWidth: innerWidth });
    window.addEventListener('resize', this.handleResize);
    this.fetchPopularStories();
    this.fetchMovieReviews();
    this.fetchNonfictionBooks();
    this.fetchFictionBooks();

    // Sync bookmarks in state with firebase
    this.ref = base.syncState('bookmarks', {
      context: this,
      state: 'bookmarks',
      asArray: true
    });
  }

  componentDidUpdate() {
    localStorage.setItem('bookmarks', JSON.stringify(this.state.bookmarks));
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleResize = () => {
    const innerWidth = window.innerWidth;
    this.setState(() => ({ windowWidth: innerWidth }));
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

  handleBookmarkClick = article => {
    // Format story or movie article into a unified bookmark object
    const formattedArticle = {
      title: article.title || article.headline,
      abstract: article.abstract || article.summary_short,
      url: article.url || article.link.url
    };

    // Bookmark checked: add article
    // Bookmark unchecked: remove article
    this.setState(prevState => {
      let bookmarks = prevState.bookmarks;
      const articleExists = bookmarks.find(
        item => item.url === formattedArticle.url
      );
      if (articleExists) {
        bookmarks = bookmarks.filter(item => item.url !== formattedArticle.url);
      } else {
        bookmarks = [...bookmarks, formattedArticle];
      }
      return {
        bookmarks
      };
    });
  };

  handleRemoveBookmark = article => {
    this.setState(prevState => {
      const bookmarks = prevState.bookmarks.filter(
        item => item.url !== article.url
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
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/home"
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
                  windowWidth={this.state.windowWidth}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                  bookmarks={this.state.bookmarks}
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
