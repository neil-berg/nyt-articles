import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Book = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  letter-spacing: 0.1px;
  padding: 0.5em 0.75em;

  > p,
  a {
    margin: 0;
    //padding: 0.35em 0.35em;
  }
  p.rank {
    font-size: 0.85em;
    font-weight: bold;
    padding: 0.5em 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
  }

  img {
    display: block;
    width: 175px;
    margin: 0;
  }
`;

const BookItem = ({ book }) => {
  return (
    <Book>
      <p className="rank">
        <span style={{ color: '#fff4a8', fontSize: '1.35em' }}>
          #{book.rank}
        </span>

        <span style={{ fontSize: '0.85em', color: '#ccc' }}>
          {book.weeks_on_list} {book.weeks_on_list > 1 ? 'weeks' : 'week'} on
          list
        </span>
      </p>
      <img src={book.book_image} alt="" />
    </Book>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;
