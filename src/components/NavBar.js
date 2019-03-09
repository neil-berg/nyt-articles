import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledUL = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0.45em 0;
  list-style-type: none;
  border-bottom: 1px lightgrey solid;
`;

const StyledLI = styled.li`
  margin: 0.25em;
  padding: 0;
  text-align: center;
  border: 1px lightgrey solid;
  border-radius: 3px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);

  a {
    text-decoration: none;
    color: black;
    text-align: center;
    display: block;
    padding: 0.25em 1em;
    transition: all 0.3s;
  }

  a:hover {
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const NavBar = () => (
  <nav>
    <StyledUL>
      <StyledLI>
        <Link to="/">Home</Link>
      </StyledLI>
      <StyledLI>
        <Link to="/topstories/:sectionId">Top Stories</Link>
      </StyledLI>
    </StyledUL>
  </nav>
);

export default NavBar;
