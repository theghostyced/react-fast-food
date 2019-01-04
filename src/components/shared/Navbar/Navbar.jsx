import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * @class
 */
export default class Navbar extends Component {
  
  /**
   * @returns {JSX} Navbar JSX
   */
  render() {
    return (
      <Fragment>
        <nav className="nav bg-white nav--shadow">
          <div className="nav__inner">
            <div className="nav__logo">
              <p><i className="nav__logo--icon"></i>Fast<span>Food</span></p>
            </div>
            <ul className="nav__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li className="nav-item nav-item-main notification hide-md">
                <Link className="nav-link nav__notification active" to="/cart">
                  <i className="icon ion-ios-cart vi"></i>
                </Link>
              </li>
            </ul>
            <ul className="nav__links--sm">
              <li>
                <Link to="/" className="open" id="open">
                  <i className="ion-android-menu"></i>
                </Link></li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}
