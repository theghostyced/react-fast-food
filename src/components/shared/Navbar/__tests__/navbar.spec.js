import { shallow } from 'enzyme';
import React from 'react';
import { Navbar, mapStateToProps } from '../Navbar.jsx';

describe('Navbar Component', () => {
  let wrapper;
  const props = {
    isAuthenicated: true,
  };

  beforeEach(() => {
    wrapper = shallow(<Navbar {...props} />);
  });

  it('it should render a Card Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('it should render a Card Component', () => {
    wrapper.setProps({
      isAuthenicated: false,
    });
    expect(wrapper.length).toEqual(1);
  });

  it.skip('it should call the openSidenav fn', () => {
    const preventDefault = jest.fn();
    const e = { preventDefault };

    wrapper.instance().openSideNav(e);
    expect(e.preventDefault).toBeCalled;
  });

  it('it should map the state to props', () => {
    const state = {
      cart: {},
    };
    expect(mapStateToProps(state)).toEqual(state.cart);
  });
});
