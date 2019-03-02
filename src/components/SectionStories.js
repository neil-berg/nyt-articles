import React from 'react';

const SectionStories = ({ label, stories }) => {
  const renderedList = stories.map(story => <p>{story.title}</p>);
  return (
    <div className="wrapper">
      <h1>{label}</h1>
      {renderedList}
    </div>
  );
};

export default SectionStories;
