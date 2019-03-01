import React from 'react';
import SectionSearch from './SectionSearch';

class App extends React.Component {
  state = {
    section: ''
  };

  handleClick = key => {
    this.setState({
      section: key
    });
  };

  render() {
    return (
      <div className="wrapper">
        <img src="/images/nyt-logo.png" alt="" />
        <h2>Today Top Stories</h2>
        <p>What section are you interested in?</p>
        <SectionSearch onClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
