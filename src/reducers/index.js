import { combineReducers } from 'redux';
import loginReducer from './auth';
import signupReducer from './signup';
import orderReducer from './order';
import CartReducer from './cart';
import HistoryReducer from './history';
import LandingReducer from './landing';

const rootReducers = combineReducers({
  auth: loginReducer,
  signup: signupReducer,
  order: orderReducer,
  cart: CartReducer,
  history: HistoryReducer,
  landing: LandingReducer,
});

export default rootReducers;
