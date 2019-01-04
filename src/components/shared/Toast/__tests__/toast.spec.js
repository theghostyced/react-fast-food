import { shallow } from 'enzyme';
import React from 'react';
import Toast from '../Toast.jsx';

describe('Toast Component', () => {
  let wrapper;
  const props = {
    isShown: true,
    type: 'error',
    children: 'jk',
  };

  beforeEach(() => {
    wrapper = shallow(<Toast {...props} />);
  });

  it('it should render a Toast Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('it should render a Toast Component', () => {
    wrapper.setProps({
      isShown: false,
    });
    expect(wrapper.length).toEqual(1);
  });
});
