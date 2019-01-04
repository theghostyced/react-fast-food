/* eslint-disable max-len */
import * as type from '../../containers/Signup/actions/actionTypes';
import signupReducer, { initialState as defaultState } from '../signup';
import updateObject from '../../helpers/stateUpdate';

describe('Login Reducer', () => {
  it(`should update state when ${type.SIGNUP_START} is triggered`, () => {
    expect(signupReducer(defaultState, { type: type.SIGNUP_START })).toEqual(
      updateObject(defaultState, {
        isLoading: true,
      }),
    );
  });

  it(`should update state when ${type.SIGNUP_FAILED} is triggered`, () => {
    const payload = {
      response: {
        data: {
          message: 'jdjajjdakdja',
        },
      },
    };
    expect(signupReducer(defaultState, { type: type.SIGNUP_FAILED, payload })).toEqual(
      updateObject(defaultState, {
        isLoading: false,
        error: true,
        errorMessage: payload.response.data.message,
        response: payload,
      }),
    );
  });

  it(`should update state when ${type.SIGNUP_SUCCESS} is triggered`, () => {
    expect(signupReducer(defaultState, { type: type.SIGNUP_SUCCESS, payload: 'passed' })).toEqual(
      updateObject(defaultState, {
        isLoading: false,
        success: true,
        response: 'passed',
      }),
    );
  });

  it('should default state when nothing is triggered', () => {
    expect(signupReducer(defaultState, { type: 'nothing' })).toEqual(
      defaultState,
    );
  });

  it('should default state when no state is passed', () => {
    expect(signupReducer(undefined, { type: 'null' })).toEqual(
      defaultState,
    );
  });
});
