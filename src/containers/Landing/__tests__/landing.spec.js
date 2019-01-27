import { shallow } from 'enzyme';
import React from 'react';
import Landing from '../Landing.jsx';

describe('Landing Component', () => {
  let wrapper;
  const props = {
    isAuthenicated: true,
  };

  beforeEach(() => {
    wrapper = shallow(<Landing {...props} />);
  });

  it('it should render a Landing Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('it should render a Landing Component', () => {
    wrapper.setProps({
      isAuthenicated: false,
    });
    expect(wrapper.length).toEqual(1);
  });
});
