import * as type from '../containers/Admin/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

export const initialState = {
  isLoading: false,
  error: null,
  success: null,
  errorMessage: null,
  response: null,
  orders: [],
};

const orderStartState = { isLoading: true };

const updateOrderSuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  response: action.payload,
  success: true,
  orders: action.payload.orders.items,
});

const updateOrderFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const updateOrdersFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.response.data.message,
});

const updateOrdersSuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  success: true,
  response: action.payload
});

const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_ORDERS_START:
      return stateUpdate(state, orderStartState);

    case type.FETCH_ORDERS_FAILED:
      return updateOrderFailedState(state, action);

    case type.FETCH_ORDERS_SUCCESS:
      return updateOrderSuccessState(state, action);

    case type.UPDATE_ORDERS_FAILED:
      return updateOrdersFailedState(state, action);

    case type.UPDATE_ORDERS_SUCCESS:
      return updateOrdersSuccessState(state, action);

    default:
      return state;
  }
};

export default AdminReducer;
