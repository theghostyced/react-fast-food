import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @class
 */
export default class CartParent extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    buttonHidden: PropTypes.bool,
    displayCartNum: PropTypes.bool,
    cartNum: PropTypes.number,
    buttonText: PropTypes.string,
    buttonClicked: PropTypes.func,
    cartPage: PropTypes.bool,
    classes: PropTypes.string,
  }

  /**
   * @returns {JSX} CartParentJSX
   */
  render() {
    return (
      <Fragment>
        <div className={`cart order-cart ${this.props.classes}`}>
        <div className="cart__title title__text--dark">{this.props.title}</div>
          <div className="overflow">
            { this.props.children }
          </div>
          {
            !this.props.buttonHidden
            && !this.props.cartPage
             && <Link to="/cart" className="cart__button button button--primary">
            {this.props.buttonText} { this.props.displayCartNum
                && this.props.cartNum > 0
                && <span className="cart__number">{this.props.cartNum}</span> }
            </Link>
          }

          {
            this.props.cartPage
            && <Link
              to="#"
              onClick={this.props.buttonClicked}
              className="cart__button button button--primary">
            {this.props.buttonText}
            </Link>
          }
        </div>
      </Fragment>
    );
  }
}
