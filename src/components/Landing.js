import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  color: black;
  text-align: center;
`;

const ListContainer = styled.ul`
  margin: 0 2em;
  padding: 0;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1.5em;
`;

const ListItem = styled.li`
  border: 1px grey solid;
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  :hover {
    box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.2);
  }

  h3 {
    border-bottom: 1px lightgrey solid;
    margin: 0;
    padding: 0.5em 0;
    width: 100%;
    text-align: center;
  }

  p {
    margin: 0;
    padding: 1em;
  }

  a {
    text-decoration: none;
    color: white;
    font-size: 1em;
    width: 100%;
    height: 100%;
    text-align: center;
    background: #3c3c3c;
    padding: 0.5em 0;
    margin: 0;
  }

  a:hover,
  a:focus {
    background: #2a2a2a;
  }
  a:active {
    background: black;
  }
`;

const Landing = () => {
  return (
    <div className="wrapper">
      <Title>Select an option to begin</Title>
      <ListContainer>
        <ListItem>
          <h3>Top Stories 🗞️</h3>
          <p>
            Quickly scan the most popular stories in Arts, Politics, Business,
            Fashion and more.
          </p>
          <Link to="/topstories">Enter</Link>
        </ListItem>
        <ListItem>
          <h3>Movie Reviews 🍿</h3>
          <p>
            Search for a movie or read what the critics are saying about their
            favorite new releases.{' '}
          </p>
          <Link to="/moviereviews">Enter</Link>
        </ListItem>
      </ListContainer>
    </div>
  );
};

export default Landing;
