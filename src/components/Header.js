import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.25em 2em;

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title a {
    text-decoration: none;
  }

  .bookmark {
    position: relative;
  }

  .bookmark a {
    color: black;
  }

  .bookmark__icon {
    font-size: 32px;
    color: #f4aa42;
  }
`;

const Count = styled.span`
  position: absolute;
  right: ${props => (props.length > 9 ? '4px' : '8px')};
  top: 4px;
  font-size: 0.85em;
  font-weight: bold;
`;
const Title = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: 2.4em;
  margin: 0;
  color: black;
  text-decoration: none;
  transition: all 0.3s;

  :hover {
    color: #2a78f7;
  }

  @media (max-width: 400px) {
    font-size: 1.75em;
  }
`;

const SubTitle = styled.p`
  font-family: Merriweather, sans-serif;
  font-size: 1em;
  margin: 0;
  color: grey;

  @media (max-width: 400px) {
    font-size: 0.725em;
  }

  a {
    text-decoration: none;
    font-weight: bold;
    color: black;
    transition: all 0.3s;
  }

  a:hover {
    color: #2a78f7;
  }
`;

const Header = ({ bookmarks }) => (
  <Container>
    <div className="bookmark">
      <Link to="/bookmarks">
        <FontAwesomeIcon icon={faBookmark} className="bookmark__icon" />
        <Count className="bookmark__count" length={bookmarks.length}>
          {bookmarks.length}
        </Count>
      </Link>
    </div>

    <div className="title">
      <Link to="/">
        <Title>News Flash</Title>
      </Link>
      <SubTitle>
        Powered by{' '}
        <a
          href="https://developer.nytimes.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The New York Times API
        </a>
      </SubTitle>
    </div>
    <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
  </Container>
);

export default Header;
