import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SideDrawer from './SideDrawer';

const StyledList = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  left: 70px;
  bottom: 15px;
  width: 85%;
  padding: 0;
  border-bottom: 1px grey solid;
  border-top: 1px grey solid;
`;

const StyledItem = styled.li`
  flex: 1;
  font-size: 0.8em;
  font-weight: bold;
  padding: 0.45em 0;
  text-align: center;

  a {
    color: black;
    text-decoration: none;
    transition: all 0.3s;
  }

  a:hover {
    color: #2a78f7;
  }
`;

const TopStoriesNav = () => {
  return (
    <nav>
      <SideDrawer />
      <StyledList>
        <StyledItem>
          <Link to="/topstories/arts">Arts</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/topstories/politics">Politics</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/topstories/sports">Sports</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/topstories/science">Science</Link>
        </StyledItem>
        <StyledItem>
          <Link to="/topstories/fashion">Fashion</Link>
        </StyledItem>
      </StyledList>
    </nav>
  );
};

export default TopStoriesNav;
