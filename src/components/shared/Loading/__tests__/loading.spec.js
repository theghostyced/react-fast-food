import { shallow } from 'enzyme';
import React from 'react';
import Loading from '../Loading.jsx';

describe('Loading Component', () => {
  let wrapper;
  const props = {
    isLoading: true,
  };

  beforeEach(() => {
    wrapper = shallow(<Loading {...props} />);
  });

  it('it should render a Loading Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('it should render a Loading Component', () => {
    wrapper.setProps({
      isLoading: false,
    });
    expect(wrapper.length).toEqual(1);
  });
});
