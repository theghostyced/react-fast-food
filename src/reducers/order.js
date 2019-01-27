import * as type from '../containers/Order/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

export const initialState = {
  isLoading: false,
  error: null,
  success: null,
  errorMessage: null,
  response: null,
  menus: [],
};

const orderStartState = { isLoading: true };

const updateOrderSuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  response: action.payload,
  success: true,
  menus: action.payload.menu,
});

const updateOrderFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_ORDER_START:
      return stateUpdate(initialState, orderStartState);

    case type.FETCH_ORDER_FAILED:
      return updateOrderFailedState(state, action);

    case type.FETCH_ORDER_SUCCESS:
      return updateOrderSuccessState(state, action);

    default:
      return state;
  }
};

export default OrderReducer;
