import * as type from '../containers/History/actions/actionTypes';
import stateUpdate from '../helpers/stateUpdate';

export const initialState = {
  isLoading: false,
  error: null,
  success: null,
  errorMessage: null,
  response: null,
  orderHistory: null,
};

const historyStartState = { isLoading: true };

const updateHistorySuccessState = (state, action) => stateUpdate(state, {
  isLoading: false,
  response: action.payload,
  success: true,
  orderHistory: action.payload.history,
});

const updateHistoryFailedState = (state, action) => stateUpdate(state, {
  isLoading: false,
  error: true,
  response: action.payload,
  errorMessage: action.payload.message,
});

const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_HISTORY_START:
      return stateUpdate(initialState, historyStartState);

    case type.FETCH_HISTORY_FAILED:
      return updateHistoryFailedState(state, action);

    case type.FETCH_HISTORY_SUCCESS:
      return updateHistorySuccessState(state, action);

    default:
      return state;
  }
};

export default HistoryReducer;
