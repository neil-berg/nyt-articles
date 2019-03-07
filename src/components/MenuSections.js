import React from 'react';
import { Link, Route } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import './MenuSections.css';

function Section({ match }) {
  console.log('am i ever tuched?');
  return (
    <div>
      <h3>{match.params.sectionId}</h3>
    </div>
  );
}

class MenuSections extends React.Component {
  showSettings(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Menu isOpen={true} width={'200px'}>
        <Link to="/topstories/arts" id="arts" className="menu-item">
          Arts
        </Link>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a onClick={this.showSettings} className="menu-item--small" href="">
          Settings
        </a>
        <Route
          path={`${this.props.match.path}/:sectionId`}
          component={Section}
        />
      </Menu>
    );
  }
}

export default MenuSections;
