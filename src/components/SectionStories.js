import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  text-align: center;
`;

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  grid-gap: 1em;
  justify-content: center;
`;

const StoryItem = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  grid-template-areas:
    'author image'
    'title image'
    'dateURL image '
    'abstract image';
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;

  > p,
  a {
    margin: 0;
    padding: 0.5em 0.5em;
  }
  p:nth-child(1) {
    grid-area: author;
    font-size: 0.65em;
    color: grey;
    font-weight: bold;
  }
  p:nth-child(2) {
    grid-area: title;
    font-size: 0.75em;
    font-weight: bold;
  }
  p:nth-child(3) {
    grid-area: dateURL;
    font-size: 0.6em;
    color: grey;
  }
  p:nth-child(4) {
    grid-area: abstract;
    font-size: 0.75em;
  }
  a {
    grid-area: url;
    font-size: 0.75em;
  }
  img {
    grid-area: image;
    display: block;
    width: 100%;
    margin: 0;
    padding: 0.25em 0em;
    align-self: center;
  }
`;

const SectionStories = ({ label, stories }) => {
  const renderedList = stories.map(story => {
    return (
      <StoryItem key={story.title}>
        <p>{story.byline.replace(/by/gi, '').trim()}</p>
        <p>{story.title}</p>
        <p>
          {story.published_date} | <a href={story.url}>Read story</a>
        </p>
        <p>{story.abstract}</p>
        <img src={story.multimedia[1] ? story.multimedia[1].url : ''} alt="" />
      </StoryItem>
    );
  });
  return (
    <div>
      <Title>Top stories for {label}</Title>
      <StoryWrapper>{renderedList}</StoryWrapper>
    </div>
  );
};

export default SectionStories;
