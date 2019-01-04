import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login.jsx';

describe('Login Component Test', () => {
  let wrapper;
  const props = {
    
  };
  beforeEach(() => {
    wrapper = shallow(<Login {...props}/>);
  });

  it('should have the email input field to have rendered', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });
});
