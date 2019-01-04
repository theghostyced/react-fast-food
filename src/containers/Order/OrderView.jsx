import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import {
  Navbar,
  CartParent,
  CartItem,
} from '../../components/shared';
import decodeToken from '../../helpers/utils';
import orderActions from './actions/orderView';
import cartActions from './actions/cart';
import Loading from '../../components/shared/Loading/Loading.jsx';

/**
 * @class
 */
export class OrderView extends Component {
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
    history: PropTypes.object,
    fetchMenuDispatcher: PropTypes.func,
    menus: PropTypes.array,
    isLoading: PropTypes.bool,
    totalPrice: PropTypes.number,
    updateCartTotalDispatcher: PropTypes.func,
  }

  /**
   * @returns{void}
   */
  componentDidMount() {
    document.body.style.backgroundColor = '#EFF4F5';
    const isAuthenticated = decodeToken();
    if (!isAuthenticated) this.props.history.push('/login');
    this.props.fetchMenuDispatcher();
  }

  /**
   * @param {object} e - The Event Object
   * @returns {void}
   * @memberof CartParent
   */
  addItemToCart = (e) => {
    e.preventDefault();
    const parentID = e.currentTarget.parentNode.parentNode.getAttribute('data-id');
    const parentDOM = document.querySelectorAll(`[data-id='${parentID}']`)[0];
    const inputDOM = parentDOM.getElementsByTagName('input')[0];
    const price = parentDOM.querySelector('.cart__item-total-price').innerHTML.split(' ')[1];
    const name = parentDOM.querySelector('.cart__item-name').innerHTML;
    const quantity = parseInt(inputDOM.value, 10);
    const cartItem = {
      price,
      quantity,
      name
    };
    if (quantity === 0 ) {
      swal({
        icon: 'error',
        title: 'Error',
        timer: '2000',
        text: 'Quantity cannot be less than 0',
      });
      return false;
    }
    this.state.cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
    inputDOM.value = 0;
    swal({
      timer: '2000',
      title: 'Added To Cart',
      text: `${name} has been added to the cart successfully`,
      icon: 'success',
    });
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

    if (type === 'inc') {
      const total = this.props.totalPrice + parseInt(price, 10);
      return this.props.updateCartTotalDispatcher({ totalPrice: total });
    }
    const total = this.props.totalPrice > 0 ? this.props.totalPrice - parseInt(price, 10) : 0;
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
   * @returns {JSX} OrderView JSX
   */
  render() {
    const { isAuthenicated } = this.state;
    const { menus, isLoading } = this.props;
    return (
      <Fragment>
        <Navbar isAuthenicated={isAuthenicated}/>
        <CartParent>
          { isLoading
            ? <Loading isLoading={isLoading}/>
            : <Fragment>
          {
            menus.map((menu, i) => <CartItem key={i}
            name={menu.name}
            imageUrl={menu.img}
            price={menu.price}
            id={menu.id}
            increment={this.increment}
            decrement={this.decrement}
            addItemToCart={this.addItemToCart}/>)
          }
        </Fragment>
      }
        </CartParent>
      </Fragment>
    );
  }
}

export const mapStateToProps = state => ({
  ...state.order,
  ...state.cart,
});

const actions = {
  ...orderActions,
  ...cartActions,
};

export const mapDispatchToProps = dispatch => bindActionCreators(
  actions,
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderView);
