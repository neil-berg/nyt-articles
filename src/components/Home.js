import React from 'react';
import styled from 'styled-components';
import TopStoriesNav from './TopStoriesNav';
import StoryItem from './StoryItem';
import MovieItem from './MovieItem';
import BookItem from './BookItem';

const ItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  grid-gap: 1em;
  justify-content: center;
`;
const BookWrapper = styled.div`
  display: flex
  align-items: flex-start;
  background: black;
  overflow: auto;
`;

const Home = ({
  windowWidth,
  popularStories,
  movieReviews,
  nonfictionBooks
}) => {
  const storyItems = popularStories
    .slice(0, 8)
    .map(story => (
      <StoryItem key={story.title} story={story} storyType="mostPopular" />
    ));
  const movieItems = movieReviews
    .slice(0, 4)
    .map(movie => <MovieItem key={movie.display_title} movie={movie} />);
  const nonfictionItems = nonfictionBooks
    .slice(0, 10)
    .map(book => <BookItem key={book.title} book={book} />);
  return (
    <div>
      <TopStoriesNav windowWidth={windowWidth} />
      <section className="popular">
        <h2 style={{ textAlign: 'center' }}>Most Viewed This Week</h2>
        <ItemWrapper>{storyItems}</ItemWrapper>
      </section>
      <section className="movies">
        <h2 style={{ textAlign: 'center' }}>Film Critic's Picks</h2>
        <ItemWrapper>{movieItems}</ItemWrapper>
      </section>
      <section className="nonfictionBooks">
        <h2 style={{ textAlign: 'center' }}>Best Sellers: Non-Fiction</h2>
        <BookWrapper>{nonfictionItems}</BookWrapper>
      </section>
    </div>
  );
};

export default Home;
