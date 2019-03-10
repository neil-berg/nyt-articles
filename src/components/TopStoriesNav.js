import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import SideDrawer from './SideDrawer';
import { sections } from '../SectionsArray';

const StyledNav = styled.nav`
  padding: 0;
  margin: 0.5em 0;
  border: 1px lightgrey solid;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  bottom: 14px;
  // width: 100%;

  li:fist-child {
    margin-left: 2em;
  }
`;

const StyledItem = styled.li`
  font-size: 1em;
  font-weight: bold;
  padding: 0;
  margin: 0;
  text-align: left;

  a {
    color: black;
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    color: #2a78f7;
  }
`;

// Note: the empty div first-child under StyledList
// acts to push remaining list items right of the hamburger
const TopStoriesNav = () => {
  // Calculate the number of section items (90px each) to place in nav
  const width = window.innerWidth;
  const numItems = Math.floor(width / 90) - 2;
  const navItems = sections.slice(0, numItems).map(item => (
    <StyledItem key={item.searchTerm}>
      <Link to={`/topstories/${item.searchTerm}`}>{item.label}</Link>
    </StyledItem>
  ));
  return (
    <StyledNav>
      <SideDrawer />
      <StyledList>
        <div />
        {navItems}
      </StyledList>
    </StyledNav>
  );
};

export default TopStoriesNav;
