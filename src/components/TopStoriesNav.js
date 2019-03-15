import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import SideDrawer from './SideDrawer';
import { sections } from '../SectionsArray';

const StyledNav = styled.nav`
  padding: 0.25em 0;
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
  bottom: 8px;
`;

const StyledItem = styled.li`
  font-size: 0.75em;
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

const BufferItem = styled.div`
  margin-right: ${props => (props.windowWidth > 500 ? '2em' : '0em')};
`;

// Note: the empty div (BufferItem) under StyledList
// simply pushes remaining list items right of the hamburger
const TopStoriesNav = ({ windowWidth }) => {
  // Calculate the number of section items (90px each) to place in nav
  const numItems = Math.floor(windowWidth / 70) - 2;
  const navItems = sections.slice(0, numItems).map(item => (
    <StyledItem key={item.searchTerm} windowWidth={windowWidth}>
      <Link to={`/topstories/${item.searchTerm}`}>{item.label}</Link>
    </StyledItem>
  ));
  return (
    <StyledNav>
      <SideDrawer />
      <StyledList>
        <BufferItem windowWidth={windowWidth} />
        {navItems}
      </StyledList>
    </StyledNav>
  );
};

TopStoriesNav.propTypes = {
  windowWidth: PropTypes.number
};

export default TopStoriesNav;
