import axios from 'axios';
import * as type from './actionTypes';

const signupStart = () => ({
  type: type.SIGNUP_START,
});

const signupSuccess = payload => ({
  type: type.SIGNUP_SUCCESS,
  payload,
});

const signupFailed = payload => ({
  type: type.SIGNUP_FAILED,
  payload,
});

const signupStop = () => ({
  type: type.SIGNUP_STOP
});

const signupDispatcher = (userData, history) => (dispatch) => {
  dispatch(signupStart());
  return axios.post(`${process.env.SERVER_API}/auth/signup`, userData)
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      dispatch(signupSuccess(res.data));
      dispatch(signupStop());
      history.push('/order');
    })
    .catch((err) => { dispatch(signupFailed(err)); dispatch(signupStop()); });
};

export default {
  signupDispatcher,
  signupStart,
  signupFailed,
  signupSuccess,
};
