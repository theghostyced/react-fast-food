import React from 'react';
import PropTypes from 'prop-types';

const CartHistoryItem = props => (
  <div className="cart__item" data-id={props.id}>
    <div className="cart__image">
        <img src={props.imageUrl}/>
    </div>
    <div className="cart__description">
        <span className="cart__item-name">{props.name}</span>
        <span className="selected">Small</span>
    </div>
    <div className="cart__quantity">
        <input
          type="text"
          name="qty"
          defaultValue={props.quantity}
        />
    </div>
    <div className="cart__item-total-price">&#8358; {props.price}</div>
    <div className="cart__date">{props.date}</div>
    <div className="cart__date">
      { props.status === 'now' && <a className="text--dark" href="#">{props.status}</a> }
      { props.status === 'Processing' && <a className="text--primary" href="#">{props.status}</a> }
      { props.status === 'Cancelled' && <a className="text--danger" href="#">{props.status}</a> }
      { props.status === 'Completed' && <a className="text--success" href="#">{props.status}</a> }
    </div>
  </div>
);

CartHistoryItem.propTypes = {
  addItemToCart: PropTypes.func,
  quantity: PropTypes.number,
  imageUrl: PropTypes.string,
  date: PropTypes.any,
  price: PropTypes.number,
  id: PropTypes.any,
  name: PropTypes.string,
  status: PropTypes.string,
};

export default CartHistoryItem;
