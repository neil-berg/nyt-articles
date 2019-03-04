import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;

  span {
    font-size: 5em;
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 1.5eml
    margin: 0;
    padding: 0;
  }
`;

const NotFound = () => {
  return (
    <Container>
      <span role="img">🧐</span>
      <p>This page is not found!</p>
    </Container>
  );
};

export default NotFound;
