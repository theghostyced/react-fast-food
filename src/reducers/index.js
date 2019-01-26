import { combineReducers } from 'redux';
import loginReducer from './auth';
import signupReducer from './signup';

const rootReducers = combineReducers({
  auth: loginReducer,
  signup: signupReducer,
});

export default rootReducers;
