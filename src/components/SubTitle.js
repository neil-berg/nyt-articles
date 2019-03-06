import React from 'react';
import styled from 'styled-components';

const StyledSubTitle = styled.h3`
  text-align: center;
  font-size: 1.25em;
`;

const SubTitle = ({ text }) => {
  return <StyledSubTitle>{text}</StyledSubTitle>;
};

export default SubTitle;
