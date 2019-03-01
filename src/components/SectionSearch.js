import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
  grid-gap: 0.4em;
  margin: 1em 2em;
`;

const Button = styled.button`
  margin: 0.25em;
  padding: 0.25em 1em;
  font-size: 1em;
  color: black;
  border-radius: 5px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
  text-align: left;
  :hover {
    background: #eeeeee;
  }
  :focus {
    outline: none;
  }
  :active {
    transform: scale(1.05);
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
  return <Container>{renderedList}</Container>;
};

export default SectionSearch;
