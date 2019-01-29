import axios from 'axios';
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

const postStart = () => ({
  type: type.POST_ORDER_START,
});

const postSuccess = payload => ({
  type: type.POST_ORDER_SUCCESS,
  payload,
});

const postFailed = payload => ({
  type: type.POST_ORDER_SUCCESS,
  payload,
});

const updateCartTotalDispatcher = payload => (dispatch) => {
  dispatch(updateCartTotal(payload));
};

const placeOrderDispatcher = order => (dispatch) => {
  dispatch(postStart());
  const options = {
    headers: {
      token: localStorage.getItem('token')
    }
  };

  return axios.post(`${process.env.SERVER_API}/orders`, order, options)
    .then((res) => {
      dispatch(postSuccess(res.data));
    })
    .catch((err) => { dispatch(postFailed(err)); });
};

export default {
  updateCartDispatcher,
  updateCartTotalDispatcher,
  placeOrderDispatcher,
  updateCart,
  updateCartTotal,
};
