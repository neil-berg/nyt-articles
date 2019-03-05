import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavBar from './NavBar';
import NavItem from './NavItem';
import { sections } from '../SectionsArray';

const Title = styled.h1`
  text-align: center;
  font-size: 1.5em;
`;

const SubHeader = styled.h3`
  text-align: center;
  font-size: 1em;
`;

const SectionContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-gap: 0.4em;
  margin: 1em 2em;
  padding: 0;
  justify-content: center;
`;

const SectionItem = styled.li`
  list-style-type: none;
  margin: 0.25em;
  padding: 0;
  font-size: 1em;
  border: 1px rgba(0, 0, 0, 0.2) solid;
  border-radius: 5px;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  text-align: left;
  transition: 0.3s;
  :hover {
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.2);
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(1.05);
  }

  a {
    color: black;
    text-decoration: none;
    border: 1pd red solid;
    padding: 0.25em 1em;
    display: block;
  }
`;

const SectionSearch = props => {
  const renderedList = sections.map(item => {
    const { label, section } = { ...item };
    return (
      <SectionItem
        key={section}
        onClick={() => props.fetchArticles(section, label)}
      >
        <Link to={`/topstories/${section}`}>{label}</Link>
      </SectionItem>
    );
  });
  return (
    <React.Fragment>
      <NavBar>
        <NavItem>
          <Link to="/">Return to home page</Link>
        </NavItem>
      </NavBar>
      <Title>Top Stories</Title>
      <SubHeader> Select a section to begin</SubHeader>
      <SectionContainer>{renderedList}</SectionContainer>
    </React.Fragment>
  );
};

SectionSearch.propTypes = {
  fetchArticles: PropTypes.func.isRequired
};

export default SectionSearch;
