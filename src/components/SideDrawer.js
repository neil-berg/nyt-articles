import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { slide as Menu } from 'react-burger-menu';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faFlag,
  faPalette,
  faUtensils,
  faLandmark,
  faFootballBall,
  faMoneyBillAlt,
  faGlobe,
  faComments,
  faUserMd,
  faBookReader,
  faShoppingBag,
  faPlane,
  faHome,
  faBookOpen,
  faVideo,
  faFlask,
  faMobileAlt,
  faArrowAltCircleUp,
  faCity,
  faSearch,
  faTheaterMasks,
  faSkullCrossbones,
  faAppleAlt,
  faCar
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sections } from '../SectionsArray';
import './SideDrawer.css';

// Library to store all font awesome icons in the side drawer
library.add(
  faFlag,
  faPalette,
  faUtensils,
  faLandmark,
  faFootballBall,
  faMoneyBillAlt,
  faGlobe,
  faComments,
  faUserMd,
  faBookReader,
  faShoppingBag,
  faPlane,
  faHome,
  faBookOpen,
  faVideo,
  faFlask,
  faMobileAlt,
  faArrowAltCircleUp,
  faCity,
  faSearch,
  faTheaterMasks,
  faSkullCrossbones,
  faAppleAlt,
  faCar
);

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
    const sectionsCopy = [...sections];
    const sortedSections = sectionsCopy.sort(function(a, b) {
      if (a.searchTerm < b.searchTerm) {
        return -1;
      } else {
        return 1;
      }
      return 0;
    });
    const renderedList = sortedSections.map(item => {
      const { searchTerm, label, icon } = { ...item };
      return (
        <Link
          key={label}
          onClick={() => this.handleClick()}
          to={`/topstories/${searchTerm}`}
        >
          <div style={{ padding: '1em' }}>
            <FontAwesomeIcon icon={icon} fixedWidth sz="lg" />
            <span style={{ marginLeft: '1.25em' }}>{label}</span>
          </div>
        </Link>
      );
    });
    return (
      <Menu
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
        width={'250px'}
      >
        {renderedList}
      </Menu>
    );
  }
}

export default SideDrawer;
