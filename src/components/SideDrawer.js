import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import { sections } from '../SectionsArray';
import './SideDrawer.css';

class SideDrawer extends React.Component {
  state = {
    menuOpen: false
  };

  handleClick = () => {
    this.closeMenu();
  };

  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  render() {
    const renderedList = sections.map(item => {
      const { label, section } = { ...item };
      return (
        <Link
          key={section}
          onClick={() => this.handleClick()}
          to={`/topstories/${section}`}
        >
          {label}
        </Link>
      );
    });
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
        width={'200px'}
      >
        {renderedList}
      </Menu>
    );
  }
}

export default SideDrawer;
