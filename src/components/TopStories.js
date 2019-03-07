import React from 'react';
import MenuSections from './MenuSections';

const TopStories = props => {
  return (
    <div>
      <MenuSections match={props.match} />
    </div>
  );
};

export default TopStories;
