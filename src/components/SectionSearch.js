import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  margin: 1em 2em;
`;

const Button = styled.button`
  margin: 0.25em;
  padding: 0.25em 1em;
  font-size: 1em;
  background: #3949ab;
  color: white;
  border-radius: 3px;
  text-align: left;
  :hover {
    background: #283593;
  }
`;

const SectionSearch = props => {
  const sections = [
    '🎨 Arts',
    '🚗 Automobiles',
    '📚 Books',
    '💰 Business',
    '👗 Fashion',
    '🍳 Food',
    '🏥 Health',
    '🏡 Home',
    '📖 Magazine',
    '🎥 Movies',
    '🇺🇸 National',
    '🗽 NY Region',
    '⚰️ Obituaries',
    '🔊 Opinion',
    '🤓 Politics',
    '🏘️ Real Estate',
    '🔬 Science',
    '🏅 Sports',
    '🏅 Sunday Review',
    '📱 Technology',
    '🎭 Theater',
    '✈️ Travel',
    '⏫ Upshot',
    '🌎 World'
  ];
  const renderedList = sections.map(section => {
    const key = section
      .split(' ')
      .slice(1)
      .join(' ');
    return (
      <Button key={key} onClick={() => props.onClick(key)}>
        {section}
      </Button>
    );
  });
  return (
    <React.Fragment>
      <h2>Welcome to the NYT Searcher</h2>
      <Container>{renderedList}</Container>;
    </React.Fragment>
  );
};

export default SectionSearch;
