/* eslint-disable max-len */
import * as type from '../../containers/History/actions/actionTypes';
import OrderReducer, { initialState as defaultState } from '../history';
import updateObject from '../../helpers/stateUpdate';

describe('Login Reducer', () => {
  it(`should update state when ${type.FETCH_HISTORY_START} is triggered`, () => {
    expect(OrderReducer(defaultState, { type: type.FETCH_HISTORY_START })).toEqual(
      updateObject(defaultState, {
        isLoading: true,
      }),
    );
  });

  it(`should update state when ${type.FETCH_HISTORY_FAILED} is triggered`, () => {
    const payload = {
      response: {
        data: {
          message: 'jdjajjdakdja',
        },
      },
    };
    expect(OrderReducer(defaultState, { type: type.FETCH_HISTORY_FAILED, payload })).toEqual(
      updateObject(defaultState, {
        isLoading: false,
        error: true,
        errorMessage: undefined,
        response: payload,
      }),
    );
  });

  it(`should update state when ${type.FETCH_HISTORY_SUCCESS} is triggered`, () => {
    const payload = {
      response: {
        data: {
          message: 'jdjajjdakdja',
        },
      },
      menu: [1, 2]
    };
    expect(OrderReducer(defaultState, { type: type.FETCH_HISTORY_SUCCESS, payload })).toEqual(
      updateObject(defaultState, {
        isLoading: false,
        success: true,
        response: payload,
        orderHistory: undefined,
      }),
    );
  });

  it('should default state when nothing is triggered', () => {
    expect(OrderReducer(defaultState, { type: 'nothing' })).toEqual(
      defaultState,
    );
  });

  it('should default state when no state is passed', () => {
    expect(OrderReducer(undefined, { type: 'null' })).toEqual(
      defaultState,
    );
  });
});
