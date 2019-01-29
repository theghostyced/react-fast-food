import axios from 'axios';
import * as type from './actionTypes';

const fetchHistoryStart = () => ({
  type: type.FETCH_HISTORY_START,
});

const fetchHistorySuccess = payload => ({
  type: type.FETCH_HISTORY_SUCCESS,
  payload,
});

const fetchHistoryFailed = payload => ({
  type: type.FETCH_HISTORY_FAILED,
  payload,
});

const fetchHistoryDispatcher = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const options = {
    headers: {
      token,
    },
  };
  dispatch(fetchHistoryStart());
  return axios.get(`${process.env.SERVER_API}/users/123/orders`, options)
    .then((res) => {
      dispatch(fetchHistorySuccess(res.data));
    })
    .catch((err) => { dispatch(fetchHistoryFailed(err)); });
};

export default {
  fetchHistoryDispatcher,
  fetchHistoryStart,
  fetchHistoryFailed,
  fetchHistorySuccess,
};
