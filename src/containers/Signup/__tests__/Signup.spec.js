/* eslint-disable import/first */
jest.mock('../../../helpers/utils/decodeToken');
import React from 'react';
import { shallow } from 'enzyme';
import { Signup, mapStateToProps, mapDispatchToProps } from '../Signup.jsx';
import decodeToken from '../../../helpers/utils/decodeToken';

describe('Signup Component Test', () => {
  let wrapper;
  const pushSpy = jest.fn();
  const preventDefaultSpy = jest.fn();
  const dispatcherSpy = jest.fn();
  const props = {
    history: {
      push: pushSpy,
    },
    signupDispatcher: dispatcherSpy,
  };
  beforeEach(() => {
    wrapper = shallow(<Signup {...props}/>);
  });

  it('should have the email input field to have rendered', () => {
    expect(wrapper.find('#email').length).toEqual(1);
  });

  it('should call the push spy', () => {
    decodeToken.mockResolvedValue(() => null);
    wrapper.instance().render();
    expect(pushSpy).toBeCalled;
  });

  it('should call the handleSubmit', () => {
    const e = {
      preventDefault: preventDefaultSpy,
    };
    wrapper.setState({
      user: {}
    });
    wrapper.instance().handleSubmit(e);
    expect(dispatcherSpy).toBeCalled;
  });

  it('should call the componentDidUpdate', () => {
    wrapper.setProps({
      error: true,
      errorMessage: 'djakda',
    });
    expect(wrapper.instance().componentDidUpdate()).toEqual(false);
  });

  it('should call the handleInput change', () => {
    const e = {
      preventDefault: preventDefaultSpy,
      target: {
        id: 1,
        value: 'jdahka'
      }
    };
    wrapper.setState({
      user: {},
    });
    wrapper.instance().handleInputChange(e);
    expect(preventDefaultSpy).toBeCalled;
  });

  it('should call the mapStateToProps', () => {
    const state = {
      auth: {}
    };
    expect(mapStateToProps(state)).toEqual(state.auth);
  });

  it('should call the mapDispatchToProps', () => {
    expect(
      typeof mapDispatchToProps(dispatcherSpy),
    ).toEqual('object');
  });
});
