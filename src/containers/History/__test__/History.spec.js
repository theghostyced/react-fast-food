/* eslint-disable max-len */
import moxios from 'moxios';
import historyActions from '../actions/history';
import * as type from '../actions/actionTypes';

const dispatchFn = jest.fn();
const url = `${process.env.SERVER_API}/users/123/orders`;

describe('Login Act{ions', () => {
  const payload = {
    data: 'djadja'
  };

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    dispatchFn.mockRestore();
    moxios.uninstall();
  });

  it(`should return an action object once ${type.FETCH_HISTORY_START} is fired`, () => {
    expect(historyActions.fetchHistoryStart()).toEqual({
      type: type.FETCH_HISTORY_START,
    });
  });

  it(`should return an action object once ${type.FETCH_HISTORY_START} is fired`, () => {
    expect(historyActions.fetchHistoryFailed(payload)).toEqual({
      type: type.FETCH_HISTORY_FAILED,
      payload,
    });
  });

  it(`should return an action object once ${type.FETCH_HISTORY_SUCCESS} is fired`, () => {
    expect(historyActions.fetchHistorySuccess(payload)).toEqual({
      type: type.FETCH_HISTORY_SUCCESS,
      payload
    });
  });

  it('should call the login start dispatch function', async () => {
    const mockResponse = {
      message: 'Successfully logged in',
    };

    window.localStorage.setItem('token', 'jdjadjjadjeopdnkcla');

    moxios.stubRequest(url, mockResponse);
    await historyActions.fetchHistoryDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalled();
    expect(dispatchFn).toBeCalledWith({ type: type.FETCH_HISTORY_START });
  });

  it('should call the login success dispatch function', async () => {
    const mockResponse = {
      data: 'works',
      message: 'Successfully logged in',
    };

    window.localStorage.setItem('token', 'jdjadjjadjeopdnkcla');

    moxios.stubRequest(url, { status: 200, response: mockResponse });
    await historyActions.fetchHistoryDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
    expect(dispatchFn).toBeCalledWith({ type: type.FETCH_HISTORY_SUCCESS, payload: mockResponse });
  });

  it('should call the login failed dispatch function', async () => {
    moxios.stubRequest(url, { status: 400 });
    window.localStorage.setItem('token', 'jdjadjjadjeopdnkcla');
    await historyActions.fetchHistoryDispatcher()(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
  });
});
