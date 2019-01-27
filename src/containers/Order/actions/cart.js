import * as type from './actionTypes';

const updateCart = payload => ({
  type: type.UPDATE_CART,
  payload,
});

const updateCartTotal = payload => ({
  type: type.UPDATE_CART_TOTAL,
  payload,
});

const updateCartDispatcher = payload => (dispatch) => {
  dispatch(updateCart(payload));
};

const updateCartTotalDispatcher = payload => (dispatch) => {
  dispatch(updateCartTotal(payload));
};

export default {
  updateCartDispatcher,
  updateCartTotalDispatcher,
  updateCart,
  updateCartTotal,
};
