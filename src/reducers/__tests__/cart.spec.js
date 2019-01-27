/* eslint-disable max-len */
import * as type from '../../containers/Order/actions/actionTypes';
import CartReducer, { initialState as defaultState } from '../cart';
import updateObject from '../../helpers/stateUpdate';

describe('Login Reducer', () => {
  it(`should update state when ${type.UPDATE_CART} is triggered`, () => {
    const payload = {
      totalPrice: 30,
      cart: [],
    };

    expect(CartReducer(defaultState, { type: type.UPDATE_CART, payload })).toEqual(
      updateObject(defaultState, {
        totalPrice: payload.totalPrice,
        cart: payload.cart,
      }),
    );
  });

  it(`should update state when ${type.UPDATE_CART_TOTAL} is triggered`, () => {
    const cart = {
      quantity: 2,
      price: 4000,
    };
    localStorage.setItem('cart', JSON.stringify([cart]));
    const payload = {
      totalPrice: 30,
      cart: [],
    };
    expect(CartReducer(defaultState, { type: type.UPDATE_CART_TOTAL, payload })).toEqual(
      updateObject(defaultState, {
        totalPrice: payload.totalPrice,
      }),
    );
    localStorage.removeItem('cart');
  });

  it('should default state when nothing is triggered', () => {
    expect(CartReducer(defaultState, { type: 'nothing' })).toEqual(
      defaultState,
    );
  });

  it('should default state when no state is passed', () => {
    expect(CartReducer(undefined, { type: 'null' })).toEqual(
      defaultState,
    );
  });
});
