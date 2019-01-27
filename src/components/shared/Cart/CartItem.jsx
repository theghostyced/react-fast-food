import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import plusBtn from '../../../styles/img/plus.svg';
import minusBtn from '../../../styles/img/minus.svg';

const CartItem = props => (
  <div className="cart__item" data-id={props.id}>
    <div className="cart__image">
        <img src={props.imageUrl}/>
    </div>
    <div className="cart__description">
        <span className="cart__item-name">{props.name}</span>
        <select id="quantity">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
    </div>
    <div className="cart__quantity">
        <button
          type="button"
          className="cart__button-plus"
          onClick={props.increment}
        >
            <img src={plusBtn} />
        </button>
        <input
          type="text"
          name="qty"
          defaultValue="0"
          onChange={props.quantity}
        />
        <button
          type="button"
          className="cart__button-minus"
          onClick={props.decrement}
        >
            <img src={minusBtn} />
        </button>
    </div>
    <div className="cart__item-total-price">&#8358; {props.price}</div>
    <div className="cart__add-to-cart">
      <Link
        to="#"
        className="button button--secondary button--radius"
        onClick={props.addItemToCart}
      >Add</Link>
    </div>
  </div>
);

CartItem.propTypes = {
  addItemToCart: PropTypes.func,
  increment: PropTypes.func,
  decrement: PropTypes.func,
  quantity: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
};

export default CartItem;
