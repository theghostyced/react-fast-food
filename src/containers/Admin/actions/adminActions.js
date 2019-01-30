import axios from 'axios';
import * as type from './actionTypes';

const fetchOrderStart = () => ({
  type: type.FETCH_ORDERS_START,
});

const fetchOrderSuccess = payload => ({
  type: type.FETCH_ORDERS_SUCCESS,
  payload,
});

const fetchOrderFailed = payload => ({
  type: type.FETCH_ORDERS_FAILED,
  payload,
});

const updateOrderFailed = payload => ({
  type: type.UPDATE_ORDERS_FAILED,
  payload,
});

const updateOrderSuccess = payload => ({
  type: type.UPDATE_ORDERS_SUCCESS,
  payload,
});

const fetchOrderDispatcher = () => (dispatch) => {
  dispatch(fetchOrderStart());
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      token
    }
  };
  return axios.get(`${process.env.SERVER_API}/orders`, options)
    .then((res) => {
      dispatch(fetchOrderSuccess(res.data));
    })
    .catch((err) => { dispatch(fetchOrderFailed(err)); });
};

const updateOrderDispatcher = (id, status, history) => (dispatch) => {
  dispatch(fetchOrderStart());
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      token
    }
  };
  return axios.put(`${process.env.SERVER_API}/orders/${id}`, { status }, options)
    .then((res) => {
      dispatch(updateOrderSuccess(res.data));
      history.push('/admin-list');
    })
    .catch((err) => { dispatch(updateOrderFailed(err)); });
};

export default {
  fetchOrderDispatcher,
  updateOrderDispatcher,
  fetchOrderStart,
  fetchOrderFailed,
  fetchOrderSuccess,
};
