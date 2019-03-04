import React from 'react';
import styled from 'styled-components';

const StyledUL = styled.ul`
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const NavBar = props => <StyledUL>{props.children}</StyledUL>;

export default NavBar;
