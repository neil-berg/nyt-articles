import React from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import { sections } from '../SectionsArray';
import MenuSections from './MenuSections';
import TopStoriesSection from './TopStoriesSection';

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

class TopStories extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.match.params.sectionId}</h2>
      </div>
    );
  }
}

export default TopStories;
