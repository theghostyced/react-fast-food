import axios from 'axios';
import * as type from './actionTypes';

const fetchStart = () => ({
  type: type.FETCH_LANDING_ORDER_START,
});

const fetchSuccess = payload => ({
  type: type.FETCH_LANDING_ORDER_SUCCESS,
  payload,
});

const fetchFailed = payload => ({
  type: type.FETCH_LANDING_ORDER_FAILED,
  payload,
});

const fetchMenuDispatcher = () => (dispatch) => {
  dispatch(fetchStart());
  return axios.get(`${process.env.SERVER_API}/menu`)
    .then((res) => {
      dispatch(fetchSuccess(res.data));
    })
    .catch((err) => { dispatch(fetchFailed(err)); });
};

export default {
  fetchMenuDispatcher,
  fetchStart,
  fetchFailed,
  fetchSuccess,
};
