import * as type from '../containers/Signup/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

const initialState = {
  isLoading: false,
  error: null,
  success: null,
  errorMessage: null,
  response: null,
};

const signupStartState = { isLoading: true };

const updateSignupSuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  response: action.payload,
  success: true,
});

const updateSignupFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SIGNUP_START:
      return stateUpdate(initialState, signupStartState);

    case type.SIGNUP_FAILED:
      return updateSignupFailedState(state, action);

    case type.SIGNUP_SUCCESS:
      return updateSignupSuccessState(state, action);

    default:
      return state;
  }
};

export default signupReducer;
