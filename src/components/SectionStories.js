import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { sections } from '../SectionsArray';
import { hoursAgo } from '../helpers';

const Title = styled.h1`
  text-align: center;
  font-size: 1.75em;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
`;

const StoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 400px));
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
    font-size: 0.65em;
    color: grey;
  }
  p:nth-child(4) {
    grid-area: abstract;
    font-size: 0.75em;
  }
  a {
    font-size: 1em;
    color: grey;
    text-decoration: none;
    margin: 0;
    border-bottom: 1px solid grey;
    padding: 0 0 2px 0;
    transition: all 0.3s;
  }
  a:hover {
    color: black;
    border-bottom: 1px solid black;
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

class SectionStories extends React.Component {
  state = {
    backToSearch: false
  };

  handleBackClick = e => {
    this.setState({ backToSearch: true });
  };

  render() {
    const { section, label, stories, handleNextClick } = this.props;
    const currentIndex = sections.findIndex(item => item.section === section);
    const nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
    const nextSection = sections[nextIndex].section;
    const nextLabel = sections[nextIndex].label;
    // console.log(currentIndex, sections.length, { nextSection, nextLabel });

    const renderedList = stories.map(story => {
      let dateStr = '';
      const numHours = hoursAgo(story.published_date);
      if (numHours > 24) {
        const numDays = Math.ceil(numHours / 24);
        dateStr = numDays > 1 ? `${numDays} days ago` : '1 day ago';
      } else {
        dateStr = `${numHours} hours ago`;
      }
      return (
        <StoryItem key={story.title}>
          <p>{story.byline.replace(/by/gi, '').trim()}</p>
          <p>{story.title}</p>
          <p>
            {dateStr} | <a href={story.url}>Read full story</a>
          </p>
          <p>{story.abstract}</p>
          <img
            src={story.multimedia[1] ? story.multimedia[1].url : ''}
            alt=""
          />
        </StoryItem>
      );
    });
    if (this.state.backToSearch) {
      return <Redirect push to="/topstories" />;
    }
    return (
      <div>
        <Title>{label}</Title>
        <button onClick={this.handleBackClick}>Select New Section</button>
        <button onClick={() => handleNextClick(nextSection, nextLabel)}>
          Next section
        </button>
        <StoryWrapper>{renderedList}</StoryWrapper>
      </div>
    );
  }
}

export default SectionStories;
