import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import {
  CartParent,
  CartItem,
  Navbar,
} from '../../components/shared';
import decodeToken from '../../helpers/utils';
import cartActions from '../Order/actions/cart';

/**
 * @class
 */
export class CartContainer extends Component {
  /**
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    const localCart = JSON.parse(localStorage.getItem('cart'));
    this.state = {
      isAuthenicated: !!decodeToken(),
      totalPrice: 0,
      cart: localCart || [],
    };
  }

  static propTypes = {
    isLoading: PropTypes.bool,
    fetchHistoryDispatcher: PropTypes.func,
    history: PropTypes.object,
    orderHistory: PropTypes.any,
    totalPrice: PropTypes.number,
    updateCartTotalDispatcher: PropTypes.func,
    placeOrderDispatcher: PropTypes.func,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#EFF4F5';
    const isAuthenticated = decodeToken();
    if (!isAuthenticated) this.props.history.push('/login');
  }

  /**
   * @description Updates the total price
   * @returns {void}
   * @param {object} parentDOM
   * @param {number} quantity
   * @param {string} type
   */
  updateTotalPrice(parentDOM, quantity, type) {
    const price = parentDOM.querySelector('.cart__item-total-price').innerHTML.split(' ')[1];
    const name = parentDOM.querySelector('.cart__item-name').innerHTML;
    const currCart = this.state.cart;
    const orderIndex = currCart.findIndex(order => order.name === name);
    const newCart = this.state.cart;

    if (type === 'inc') {
      const total = this.props.totalPrice + parseInt(price, 10);
      newCart[orderIndex].quantity += 1;
      this.setState({
        cart: newCart,
      });
      localStorage.setItem('cart', JSON.stringify(this.state.cart));
      return this.props.updateCartTotalDispatcher({ totalPrice: total });
    }
    const total = this.props.totalPrice > 0 ? this.props.totalPrice - parseInt(price, 10) : 0;
    newCart[orderIndex].quantity -= 1;
    this.setState({
      cart: newCart,
    });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    return this.props.updateCartTotalDispatcher({ totalPrice: total });
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  increment = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const inputDOM = parentDOM.getElementsByTagName('input')[0];
    let quantity = parseInt(inputDOM.value, 10);
    if (quantity <= 100) {
      quantity += 1;
    } else {
      quantity = 0;
    }
    inputDOM.value = quantity;
    this.updateTotalPrice(parentDOM, quantity, 'inc');
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  decrement = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const inputDOM = parentDOM.getElementsByTagName('input')[0];
    let quantity = parseInt(inputDOM.value, 10);
    if (quantity > 0) {
      quantity -= 1;
    } else {
      quantity = 0;
    }
    inputDOM.value = quantity;
    this.updateTotalPrice(parentDOM, quantity, 'dec');
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  removeItem = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const name = parentDOM.querySelector('.cart__item-name').innerHTML;
    const orderIndex = this.state.cart.findIndex(order => order.name === name);
    const newCart = this.state.cart;

    newCart.splice(orderIndex, 1);
    this.setState({
      cart: newCart,
    });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  placeOrder = (e) => {
    e.preventDefault();
    if (this.state.cart.length === 0) {
      swal({
        title: 'Order Failed',
        text: 'No item in the cart! Did you forget to add an item?',
        icon: 'error',
        timer: '2000'
      });
      return;
    }
    this.state.cart.map((item) => {
      const order = {
        mealName: item.name,
        qty: item.quantity,
      };

      return this.props.placeOrderDispatcher(order);
    });
    this.setState({
      cart: []
    });
    localStorage.removeItem('cart');
    swal({
      title: 'Order Success',
      text: 'Your order was placed successfully',
      icon: 'success',
      timer: '2000'
    });
  }

  /**
   * @returns {JSX} History JSX template
   */
  render() {
    const { cart } = this.state;
    return (
      <Fragment>
        <Navbar isAuthenicated={this.state.isAuthenicated}/>
        <CartParent
          buttonClicked={this.placeOrder}
          buttonHidden={false}
          buttonText="Place Order"
          cartPage={true}
          title="Cart">
           {
             cart.length > 0
               ? cart.map((item, i) => <CartItem
              key={i}
              cartPage={true}
              increment={this.increment}
              decrement={this.decrement}
              imageUrl={item.imageUrl}
              id={i}
              price={item.price}
              name={item.name}
              quantity={item.quantity}
              removeItem={this.removeItem}
              ></CartItem>)
               : <p className="text--center pt-3 pb-2">No item in cart!</p>
           }
        </CartParent>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.cart,
});

export const mapDispatchToProps = dispatch => bindActionCreators(
  cartActions,
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartContainer);
