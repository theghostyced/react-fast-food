import { shallow } from 'enzyme';
import React from 'react';
import SideNav from '../SideNav.jsx';

describe('Sidenav Component', () => {
  let wrapper;
  const props = {
    isAuthenicated: true,
  };

  beforeEach(() => {
    wrapper = shallow(<SideNav {...props} />);
  });

  it('it should render a Sidenav Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it.skip('it should call the openSidenav fn', () => {
    const preventDefault = jest.fn();
    const e = { preventDefault };

    wrapper.instance().closeSideNav(e);
    expect(e.preventDefault).toBeCalled;
  });
});
