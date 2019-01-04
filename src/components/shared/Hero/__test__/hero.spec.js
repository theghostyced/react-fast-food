import { shallow } from 'enzyme';
import React from 'react';
import Hero from '../Hero.jsx';

describe('Hero Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Hero />);
  });

  it('it should render a Hero Component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
