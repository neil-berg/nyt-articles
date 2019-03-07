import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledUL = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 1em;
  list-style-type: none;
`;

const StyledLI = styled.li`
  flex: 1;
  margin: 0 0.25em;
  padding: 0;
  text-align: center;

  a {
    text-decoration: none;
    color: black;
    text-align: center;
    display: block;
    padding-bottom: 0.25em;
    border-bottom: 2px white solid;
  }

  a:hover {
    border-bottom: 2px grey solid;
  }
`;

const NavBar = () => (
  <nav>
    <StyledUL>
      <StyledLI>
        <Link to="/">Home</Link>
      </StyledLI>
      <StyledLI>
        <Link to="/topstories">Top Stories</Link>
      </StyledLI>
      <StyledLI>
        <Link to="/criticspicks">Critic's Picks</Link>
      </StyledLI>
      <StyledLI>
        <Link to="/reviewarchives">Review Archives</Link>
      </StyledLI>
    </StyledUL>
  </nav>
);

export default NavBar;
