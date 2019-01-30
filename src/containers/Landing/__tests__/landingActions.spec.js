/* eslint-disable max-len */
import moxios from 'moxios';
import orderActions from '../actions/landing';
import * as type from '../actions/actionTypes';

const dispatchFn = jest.fn();
const url = `${process.env.SERVER_API}/menu`;

describe('Login Act{ions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    dispatchFn.mockRestore();
    moxios.uninstall();
  });

  it(`should return an action object once ${type.FETCH_LANDING_ORDER_START} is fired`, () => {
    expect(orderActions.fetchStart()).toEqual({
      type: type.FETCH_LANDING_ORDER_START,
    });
  });

  it(`should return an action object once ${type.FETCH_LANDING_ORDER_FAILED} is fired`, () => {
    expect(orderActions.fetchFailed()).toEqual({
      type: type.FETCH_LANDING_ORDER_FAILED,
    });
  });

  it(`should return an action object once ${type.FETCH_LANDING_ORDER_SUCCESS} is fired`, () => {
    expect(orderActions.fetchSuccess()).toEqual({
      type: type.FETCH_LANDING_ORDER_SUCCESS,
    });
  });

  it('should call the login start dispatch function', async () => {
    const mockResponse = {
      message: 'Successfully logged in',
    };

    moxios.stubRequest(url, mockResponse);
    await orderActions.fetchMenuDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalled();
    expect(dispatchFn).toBeCalledWith({ type: type.FETCH_LANDING_ORDER_START });
  });

  it('should call the login success dispatch function', async () => {
    const mockResponse = {
      data: 'works',
      message: 'Successfully logged in',
    };

    moxios.stubRequest(url, { status: 200, response: mockResponse });
    await orderActions.fetchMenuDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
    expect(dispatchFn).toBeCalledWith({ type: type.FETCH_LANDING_ORDER_SUCCESS, payload: mockResponse });
  });

  it('should call the login failed dispatch function', async () => {
    moxios.stubRequest(url, { status: 400 });
    await orderActions.fetchMenuDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
  });
});
