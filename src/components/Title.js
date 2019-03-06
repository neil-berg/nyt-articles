import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 1.5em;
`;

const Title = ({ text }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export default Title;
