import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Book = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.1px;

  > p,
  a {
    margin: 0;
    //padding: 0.35em 0.35em;
  }
  p.rank {
    font-size: 0.85em;
    padding-bottom: 0.5em;
    color: grey;
    font-weight: bold;
  }

  img {
    display: block;
    width: 100%;
    margin: 0;
  }
`;

const BookItem = ({ book }) => {
  return (
    <Book>
      <p className="rank">
        <span style={{ color: 'black' }}>#{book.rank}</span> |{' '}
        {book.weeks_on_list} {book.weeks_on_list > 1 ? 'weeks' : 'week'} on list
      </p>
      <img src={book.book_image} alt="" />
    </Book>
  );
};

// SectionStories.propTypes = {
//   section: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   stories: PropTypes.array.isRequired,
//   handleNextClick: PropTypes.func.isRequired,
//   showMoreStories: PropTypes.func.isRequired
// };

export default BookItem;
