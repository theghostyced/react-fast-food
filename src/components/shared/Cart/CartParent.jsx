import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @class
 */
export default class CartParent extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  /**
   * @returns {JSX} CartParentJSX
   */
  render() {
    return (
      <Fragment>
        <div className="cart order-cart">
        <div className="cart__title title__text--dark">Menu List</div>
          <div className="overflow">
            { this.props.children }
          </div>
          <Link to="/cart" className="cart__button button button--primary">View Cart</Link>
        </div>
      </Fragment>
    )
  }
}
