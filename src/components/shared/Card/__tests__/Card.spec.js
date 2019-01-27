import { shallow } from 'enzyme';
import React from 'react';
import Card from '../Card.jsx';

describe('Card Component', () => {
  let wrapper;
  const preventDefaultSpy = jest.fn();
  const props = {
    imageUrl: 'vjgdshvbsdkjhb',
    title: 'vjdbhvbfvkj',
    body: 'bkjdfhvkbxbx',
    author: {
      userName: 'vcbvxhc',
      imageUrl: 'sjdvbdshms',
    },
    readTime: 1,
    slug: 'dhhdh',
  };

  beforeEach(() => {
    wrapper = shallow(<Card {...props} />);
  });

  it('it should render a Card Component', () => {
    shallow(<Card {...props} />);
  });

  it('should render default avatar', () => {
    wrapper.setProps({
      author: {
        imageUrl: null,
      },
    });
  });

  it('should render clicked button state', () => {
    wrapper.setState({
      clicked: true,
    });
  });

  it('should call the handleClick method', () => {
    wrapper.setState({
      clicked: true,
    });

    const e = {
      preventDefault: preventDefaultSpy,
    };

    wrapper.instance().handleClick(e);
    expect(preventDefaultSpy).toBeCalled;
  });
});
