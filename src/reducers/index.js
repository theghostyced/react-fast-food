import { combineReducers } from 'redux';
import loginReducer from './auth';
import signupReducer from './signup';
import orderReducer from './order';
import CartReducer from './cart';

const rootReducers = combineReducers({
  auth: loginReducer,
  signup: signupReducer,
  order: orderReducer,
  cart: CartReducer,
});

export default rootReducers;
