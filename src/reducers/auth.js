import * as type from '../containers/Login/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

export const initialState = {
  isLoading: false,
  error: null,
  success: null,
  errorMessage: null,
  response: null,
};

const loginStartState = { isLoading: true, error: false };
const laodingStop = { isLoading: false };

const updateLoginSuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  response: action.payload,
  success: true,
});

const updateLoginFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_START:
      return stateUpdate(state, loginStartState);

    case type.LOGIN_FAILED:
      return updateLoginFailedState(state, action);

    case type.LOGIN_SUCCESS:
      return updateLoginSuccessState(state, action);

    case type.LOGIN_STOP:
      return updateLoginSuccessState(state, laodingStop);

    default:
      return state;
  }
};

export default loginReducer;
