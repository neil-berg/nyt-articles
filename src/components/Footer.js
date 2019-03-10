import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 0.5em 0;
  border-top: 1px grey solid;

  img {
    display: block;
    width: 100%;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <a href="https://developer.nytimes.com/">
        <img src="/images/nyt-data-logo.png" alt="New York Times logo" />
      </a>
    </StyledFooter>
  );
};

export default Footer;
