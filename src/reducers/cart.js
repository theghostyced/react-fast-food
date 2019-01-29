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
  isLoadinng: null,
  response: null,
  error: null,
  errorMessage: null,
};

const updateOrderSuccessState = (state, action) => stateUpdate(state, {
  totalPrice: action.payload.totalPrice,
  cart: action.payload.cart,
});

const updateTotalSuccessState = (state, action) => stateUpdate(state, {
  totalPrice: action.payload.totalPrice,
});

const postOrderStart = state => stateUpdate(state, {
  isLoadinng: true,
});

const postOrderFailed = (state, action) => stateUpdate(state, {
  error: true,
  errorMessage: action.payload.data.message,
});

const postOrderSuccess = (state, action) => stateUpdate(state, {
  success: true,
  response: action.payload,
});

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_CART:
      return updateOrderSuccessState(state, action);

    case type.UPDATE_CART_TOTAL:
      return updateTotalSuccessState(state, action);

    case type.POST_ORDER_START:
      return postOrderStart(state);
    case type.POST_ORDER_FAILED:
      return postOrderFailed(state, action);
    case type.POST_ORDER_SUCCESS:
      return postOrderSuccess(state, action);
    default:
      return state;
  }
};

export default CartReducer;
