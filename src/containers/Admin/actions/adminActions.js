import axios from 'axios';
import * as type from './actionTypes';

const fetchOrderStart = () => ({
  type: type.FETCH_ORDER_START,
});

const fetchOrderSuccess = payload => ({
  type: type.FETCH_ORDER_SUCCESS,
  payload,
});

const fetchOrderFailed = payload => ({
  type: type.FETCH_ORDER_FAILED,
  payload,
});

const fetchOrderDispatcher = () => (dispatch) => {
  dispatch(fetchOrderStart());
  return axios.get(`${process.env.SERVER_API}/menu`)
    .then((res) => {
      dispatch(fetchOrderSuccess(res.data));
    })
    .catch((err) => { dispatch(fetchOrderFailed(err)); });
};

export default {
  fetchOrderDispatcher,
  fetchOrderStart,
  fetchOrderFailed,
  fetchOrderSuccess,
};
