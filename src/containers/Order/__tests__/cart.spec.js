/* eslint-disable max-len */
import moxios from 'moxios';
import cartActions from '../actions/cart';
import * as type from '../actions/actionTypes';

const dispatchFn = jest.fn();
const url = `${process.env.SERVER_API}/orders`;

describe('Login Act{ions', () => {
  const payload = {};

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    dispatchFn.mockRestore();
    moxios.uninstall();
  });

  it(`should return an action object once ${type.UPDATE_CART} is fired`, () => {
    expect(cartActions.updateCart(payload)).toEqual({
      type: type.UPDATE_CART,
      payload
    });
  });

  it(`should return an action object once ${type.UPDATE_CART_TOTAL} is fired`, () => {
    expect(cartActions.updateCartTotal(payload)).toEqual({
      type: type.UPDATE_CART_TOTAL,
      payload
    });
  });

  it(`should return an action object once ${type.POST_ORDER_START} is fired`, () => {
    expect(cartActions.postStart()).toEqual({
      type: type.POST_ORDER_START
    });
  });

  it(`should return an action object once ${type.POST_ORDER_FAILED} is fired`, () => {
    expect(cartActions.postFailed(payload)).toEqual({
      type: type.POST_ORDER_FAILED,
      payload
    });
  });

  it(`should return an action object once ${type.POST_ORDER_SUCCESS} is fired`, () => {
    expect(cartActions.postSuccess(payload)).toEqual({
      type: type.POST_ORDER_SUCCESS,
      payload
    });
  });

  it('should call the dispatch function', () => {
    cartActions.updateCartTotalDispatcher(payload)(dispatchFn);
    expect(dispatchFn).toBeCalledWith({ type: type.UPDATE_CART_TOTAL, payload, });
  });

  it('should call the dispatch function', () => {
    cartActions.updateCartDispatcher(payload)(dispatchFn);
    window.localStorage.setItem('token', 'dhkadjkadjaj');
    expect(dispatchFn).toBeCalledWith({ type: type.UPDATE_CART, payload, });
  });


  it('should call the login success dispatch function', async () => {
    const mockResponse = {
      data: 'works',
      message: 'Successfully logged in',
    };

    window.localStorage.setItem('token', 'jdjadjjadjeopdnkcla');

    moxios.stubRequest(url, { status: 200, response: mockResponse });
    await cartActions.placeOrderDispatcher(payload)(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
    expect(dispatchFn).toBeCalledWith({ type: type.POST_ORDER_SUCCESS, payload: mockResponse });
  });

  it('should call the login failed dispatch function', async () => {
    moxios.stubRequest(url, { status: 400 });
    window.localStorage.setItem('token', 'jdjadjjadjeopdnkcla');
    await cartActions.placeOrderDispatcher(payload)(dispatchFn);
    expect(dispatchFn).toBeCalledTimes(2);
  });
});
