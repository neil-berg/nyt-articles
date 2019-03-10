import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-family: 'Bungee Shade', cursive;
  font-size: 2.25em;
  margin: 0;
`;

const SubTitle = styled.p`
  font-family: Merriweather, sans-serif;
  font-size: 1.05em;
  margin: 0;
  color: grey;

  a {
    text-decoration: none;
    font-weight: bold;
    color: black;
  }

  a:hover {
    color: #2a78f7;
  }
`;

const Header = () => (
  <Container>
    <Title>News Flash</Title>
    <SubTitle>
      Powered by{' '}
      <a href="https://www.nytimes.com" target="_blank">
        The New York Times
      </a>
    </SubTitle>
  </Container>
);

export default Header;
