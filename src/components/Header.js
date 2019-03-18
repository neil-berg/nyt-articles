import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-areas: 'userBookmark title button';
  align-items: center;

  .userBookmark {
    grid-area: userBookmark;
    justify-self: left;
    display: flex;
    align-items: center;
  }

  .userBookmark .bookmark {
    position: relative;
  }

  .userBookmark .bookmark a {
    color: black;
  }

  .userBookmark .bookmark .bookmark__icon {
    font-size: 36px;
    color: #f4aa42;
  }

  .title {
    grid-area: title;
    justify-self: center;
  }

  .title a {
    text-decoration: none;
  }

  .button {
    grid-area: button;
    justify-self: right;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'title title'
      'userBookmark button';

    .userBookmark {
      justify-self: center;
    }

    .button {
      justify-self: center;
    }
  }
`;

const Count = styled.span`
  position: absolute;
  right: ${props => (props.length > 9 ? '5px' : '9px')};
  top: 5px;
  font-size: 0.9em;
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
    font-size: 2.1em;
  }
`;

const SubTitle = styled.p`
  font-family: 'Noto Serif', serif;
  font-size: 1em;
  margin: 0;
  color: grey;

  @media (max-width: 400px) {
    font-size: 0.9em;
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

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin: 0.25em 1em;
`;

const Button = styled.button`
  background: black;
  color: white;
  padding: 0.75em;
  margin: 0.25em 1em;
  font-size: 0.75em;
  border-radius: 4px;
  text-align: center;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-out;

  :hover {
    background: white;
    color: black;
  }
`;

const Header = ({ bookmarks, user, logout }) => (
  <Container user={user}>
    <div className="userBookmark">
      {user ? (
        <UserImage className="userImage" src={user ? user.photoURL : ''} />
      ) : null}
      <div className="bookmark">
        <Link to="/bookmarks">
          <FontAwesomeIcon
            icon={faBookmark}
            className="bookmark__icon"
            style={{ marginLeft: !user ? '1em' : '0' }}
          />
          <Count className="bookmark__count" length={bookmarks.length}>
            {bookmarks.length}
          </Count>
        </Link>
      </div>
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

    <div className="button">
      {!user ? (
        <Link to="/login">
          <Button>Log In</Button>
        </Link>
      ) : (
        <Button onClick={logout}>Log Out</Button>
      )}
    </div>
  </Container>
);

export default Header;
