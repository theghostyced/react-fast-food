import axios from 'axios';
import * as type from './actionTypes';

const loginStart = () => ({
  type: type.LOGIN_START,
});

const loginSuccess = payload => ({
  type: type.LOGIN_SUCCESS,
  payload,
});

const loginFailed = payload => ({
  type: type.LOGIN_FAILED,
  payload,
});

const loadingStop = () => ({
  type: type.LOGIN_STOP,
});

const loginDispatcher = (userData, history) => (dispatch) => {
  dispatch(loginStart());
  return axios.post(`${process.env.SERVER_API}/auth/login`, userData)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess(res.data));
      dispatch(loadingStop());
      history.push('/order');
    })
    .catch((err) => { dispatch(loginFailed(err)); dispatch(loadingStop()); });
};

export default {
  loginDispatcher,
  loginStart,
  loginFailed,
  loginSuccess,
  loadingStop
};
