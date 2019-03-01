import React from 'react';
import SectionSearch from './SectionSearch';

class App extends React.Component {
  state = {
    section: ''
  };

  handleClick = key => {
    console.log(key);
    this.setState({
      section: key
    });
  };

  render() {
    return <SectionSearch onClick={this.handleClick} />;
  }
}

export default App;
