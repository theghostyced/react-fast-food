/* eslint-disable max-len */
import cartActions from '../actions/cart';
import * as type from '../actions/actionTypes';

const dispatchFn = jest.fn();

describe('Login Act{ions', () => {
  const payload = {};

  afterEach(() => {
    dispatchFn.mockRestore();
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

  it('should call the dispatch function', () => {
    cartActions.updateCartTotalDispatcher(payload)(dispatchFn);
    expect(dispatchFn).toBeCalledWith({ type: type.UPDATE_CART_TOTAL, payload, });
  });

  it('should call the dispatch function', () => {
    cartActions.updateCartDispatcher(payload)(dispatchFn);
    expect(dispatchFn).toBeCalledWith({ type: type.UPDATE_CART, payload, });
  });
});
