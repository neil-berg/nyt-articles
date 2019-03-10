import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import TopStories from './TopStories';
import MovieReviews from './MovieReviews';
import BookReviews from './BookReviews';
import NotFound from './NotFound';
import { KEY } from '../apis/nyt';

class App extends React.Component {
  // state = {
  //   section: '',
  //   label: '',
  //   movieTitle: '',
  //   stories: [],
  //   moreStories: [],
  //   criticsPicksMovies: [],
  //   userSearchMovies: [],
  //   isLoading: false,
  //   showMore: false
  // };

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
            <Route exact path="/" component={Home} />
            <Route path="/topstories/:sectionId" component={TopStories} />
            <Route exact path="/movies" component={MovieReviews} />
            <Route exact path="/books" component={BookReviews} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
