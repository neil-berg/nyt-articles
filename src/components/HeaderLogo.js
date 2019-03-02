import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px grey solid;

  img {
    display: inline;
    padding: 1em 0em;
    transform: scale(1.5);
  }
`;

const Header = () => {
  return (
    <Container>
      <img src="/images/nyt-logo.svg" alt="" />
    </Container>
  );
};

export default Header;
