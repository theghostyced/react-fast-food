import * as type from '../containers/Order/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

const localCart = JSON.parse(localStorage.getItem('cart'));
let totalPrice = 0;
if (localCart) {
  localCart.forEach((cart) => {
    totalPrice += cart.quantity * parseInt(cart.price, 10);
    return totalPrice;
  });
}

export const initialState = {
  totalPrice,
  cart: [],
};

const updateOrderSuccessState = (state, action) => stateUpdate(state, {
  totalPrice: action.payload.totalPrice,
  cart: action.payload.cart,
});

const updateTotalSuccessState = (state, action) => stateUpdate(state, {
  totalPrice: action.payload.totalPrice,
});

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_CART:
      return updateOrderSuccessState(state, action);

    case type.UPDATE_CART_TOTAL:
      return updateTotalSuccessState(state, action);

    default:
      return state;
  }
};

export default CartReducer;
