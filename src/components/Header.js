import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    color: black
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    color: #2a78f7;
  }
`;

const Title = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: 2.4em;
  margin: 0;
`;

const SubTitle = styled.p`
  font-family: Merriweather, sans-serif;
  font-size: 1em;
  margin: 0;
  color: grey;

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

const Header = () => (
  <Container>
    <Link to="/">
      <Title>News Flash</Title>
    </Link>
    <SubTitle>
      Powered by{' '}
      <a href="https://developer.nytimes.com/" target="_blank">
        The New York Times API
      </a>
    </SubTitle>
  </Container>
);

export default Header;