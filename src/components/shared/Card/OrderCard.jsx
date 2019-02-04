/* eslint-disable valid-jsdoc */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * @class
 */
export class OrderCard extends Component {
  /**
   * @returns {void}
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = props.state;
  }

  static propTypes = {
    price: PropTypes.any,
    img: PropTypes.any,
    name: PropTypes.any,
    id: PropTypes.number,
    state: PropTypes.any,
  }

  /**
   *@returns {void}
   *
   * @memberof Card
   */
  handleClick = (e) => {
    e.preventDefault();
    const currentState = this.state.clicked;
    this.setState({ clicked: !currentState });
    this.addItemToCart(e);
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  addItemToCart = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const price = parseInt(parentDOM.querySelector('.card__price').firstChild.innerHTML.split(' ')[1], 10);
    const name = parentDOM.querySelector('.card__title--text').innerHTML;
    const imageUrl = parentDOM.querySelector('.card__image').firstChild.src;
    const cartItem = {
      price,
      quantity: 1,
      name,
      imageUrl
    };

    this.state.cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  /**
   * @description Checks if item is in cart
   * @param {string} name
   * @returns {bool} True or False
   */
  inCart(name) {
    const currCart = this.state.cart;
    const orderIndex = currCart.findIndex(order => order.name === name);

    if (orderIndex === -1) return false;
    return true;
  }

  /**
   * @returns {JSX} JSX
   */
  render() {
    const clickedState = this.state.clicked;
    return (
      <Fragment>
      <div
        className="card card--vertical card--has-shadow card--shape grid-item mt-4"
        data-id={this.props.id}>
        <div className="card__image">
          <img src={this.props.img} />
        </div>
        <div className="card__content">
          <div className="card__title">
            <h3 className="card__title--text text--capitalise title__text--dark pt-1">{this.props.name}</h3>
          </div>
          <div className="card__price">
            <span>&#8358; {this.props.price}</span>
          </div>
          <div className="card__button">
           {
             this.inCart(this.props.name)
               ? <a
                  className='button button--secondary button--clicked'
                  disabled>Added Item</a>
               : <a
                  href="#"
                  className={clickedState ? 'button button--secondary button--clicked' : 'button button--secondary'}
                  onClick={this.handleClick}>{ this.state.clicked
                    ? 'Added Item'
                    : 'Add To Cart' }</a>
           }
          </div>
        </div>
      </div>
      </Fragment>
    );
  }
}

export default OrderCard;
