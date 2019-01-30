import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class Navbar extends Component {
  static propTypes = {
    isAuthenicated: PropTypes.bool.isRequired,
    totalPrice: PropTypes.number,
  }

  /**
   * @returns {void}
   * @param {object} e
   */
  openSideNav(e) {
    e.preventDefault();
    document.getElementById('js-side-nav').style.width = '250px';
  }

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
            {
              !this.props.isAuthenicated
                ? <ul className="nav__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
                : <ul className="nav__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/order">Menu</Link></li>
              <li><Link to="/cart">Menu</Link></li>
              <li><Link to="/history">History</Link></li>
              <li className="logout" onClick= {() => {
                localStorage.removeItem('token');
                window.location.replace('/');
              }}
              style={{ cursor: 'pointer' }}>
                <Link to="#">Logout</Link>
              </li>
              <li><Link className="nav__total" to="/cart">
                Total: &#8358; {this.props.totalPrice}
              </Link></li>
            </ul>
            }
            <ul className="nav__links--sm">
              <li>
                <Link to="/" className="open" onClick={this.openSideNav}>
                  <i className="ion-android-menu"></i>
                </Link></li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.cart,
});

export default connect(
  mapStateToProps,
)(Navbar);
