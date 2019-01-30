/* eslint-disable max-len */
import faker from 'faker';
import moxios from 'moxios';
import loginActions from '../actions/signup';
import * as type from '../actions/actionTypes';

const dispatchFn = jest.fn();
const url = `${process.env.SERVER_API}/auth/signup`;

describe('Signup Act{ions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    dispatchFn.mockRestore();
    moxios.uninstall();
  });

  it(`should return an action object once ${type.SIGNUP_START} is fired`, () => {
    expect(loginActions.signupStart()).toEqual({
      type: type.SIGNUP_START,
    });
  });

  it(`should return an action object once ${type.SIGNUP_FAILED} is fired`, () => {
    expect(loginActions.signupFailed()).toEqual({
      type: type.SIGNUP_FAILED,
    });
  });

  it(`should return an action object once ${type.SIGNUP_SUCCESS} is fired`, () => {
    expect(loginActions.signupSuccess()).toEqual({
      type: type.SIGNUP_SUCCESS,
    });
  });

  it('should call the login start dispatch function', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const mockResponse = {
      message: 'Successfully logged in',
    };

    moxios.stubRequest(url, mockResponse);
    await loginActions.signupDispatcher(fakeUser)(dispatchFn);
    expect(dispatchFn).toBeCalled();
    expect(dispatchFn).toBeCalledWith({ type: type.SIGNUP_START });
  });

  it('should call the login success dispatch function', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    const mockResponse = {
      data: 'works',
      message: 'Successfully logged in',
    };

    moxios.stubRequest(url, { status: 200, response: mockResponse });
    await loginActions.signupDispatcher(fakeUser, { push() {} })(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(3);
    expect(dispatchFn).toBeCalledWith({ type: type.SIGNUP_SUCCESS, payload: mockResponse });
  });

  it('should call the login failed dispatch function', async () => {
    const fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    moxios.stubRequest(url, { status: 400 });
    await loginActions.signupDispatcher(fakeUser, { push() {} })(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(3);
  });
});
