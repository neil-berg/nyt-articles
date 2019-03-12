import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import TopStories from './TopStories';
import MovieReviews from './MovieReviews';
import BookReviews from './BookReviews';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';

console.log(process.env.REACT_APP_API_KEY);

class App extends React.Component {
  state = {
    windowWidth: null,
    popularStories: []
  };

  componentDidMount() {
    const innerWidth = window.innerWidth;
    this.setState({ windowWidth: innerWidth });
    window.addEventListener('resize', this.handleResize);
    this.fetchPopularStories();
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const innerWidth = window.innerWidth;
    this.setState(prevState => ({ windowWidth: innerWidth }));
  };

  fetchPopularStories = async () => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=${KEY}`;
    const response = await fetch(url);
    const json = await response.json();
    const popularStories = await json.results;
    this.setState({ popularStories });
  };

  // componentDidMount() {
  //   const { section, label } = JSON.parse(localStorage.getItem('nytdata'));
  //   // Initial fetch of top stories
  //   if (section && label) {
  //     this.setState({ section, label });
  //     this.fetchTopStories(section, label);
  //   }
  //   // Initial fetch of critic's movie picks
  //   // this.fetchCriticsPicksMovies();
  // }

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
                />
              )}
            />
            <Route
              path="/topstories/:sectionId"
              render={props => (
                <TopStories {...props} windowWidth={this.state.windowWidth} />
              )}
            />
            <Route exact path="/movies" component={MovieReviews} />
            <Route exact path="/books" component={BookReviews} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
