import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


/**
 * @class
 */
class SideNav extends Component {
  /**
   * @returns {void}
   * @param {object} e
   */
  closeSideNav(e) {
    e.preventDefault();
    document.getElementById('js-side-nav').style.width = '0px';
  }

  /**
   * @returns {JSX} SideNav JSX
   */
  render() {
    return (
      <div id="js-side-nav" className="sidenav">
      <Link
        onClick={this.closeSideNav}
        to="#" id="js-closebtn"
        className="closebtn">
        <i className="ion-ios-close-outline"></i>
      </Link>
      { this.props.children }
    </div>
    );
  }
}

SideNav.propTypes = {
  children: PropTypes.any,
};

export default SideNav;
