import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import { sections } from '../SectionsArray';

const SectionContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
  grid-gap: 0.4em;
  margin: 1em 2em;
  padding: 0;
  justify-content: center;
`;

const SectionItem = styled.li`
  list-style-type: none;
  margin: 0.25em;
  padding: 0;
  font-size: 0.5em;
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

const TopStories = ({ match, fetchTopStories }) => {
  const renderedList = sections.map(item => {
    const { label, section } = { ...item };
    return (
      <SectionItem
        key={section}
        onClick={() => fetchTopStories(section, label)}
      >
        <Link to={`${match.url}/${section}`}>{label}</Link>
      </SectionItem>
    );
  });
  return (
    <React.Fragment>
      <SectionContainer>{renderedList}</SectionContainer>
      <Route path={`${match.path}/:sectionId`} component={Section} />
    </React.Fragment>
  );
};

const Section = ({ match }) => {
  return (
    <div>
      <h3>{match.params.sectionId}</h3>
    </div>
  );
};

export default TopStories;
