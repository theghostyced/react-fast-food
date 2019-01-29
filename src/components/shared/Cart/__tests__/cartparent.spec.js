import { shallow } from 'enzyme';
import React from 'react';
import CartParent from '../CartParent.jsx';

describe('CartParent Component', () => {
  let wrapper;
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
    buttonHidden: false,
  };

  beforeEach(() => {
    wrapper = shallow(<CartParent {...props} />);
  });

  it('it should render a CartParent Component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('it should render a CartParent Component', () => {
    wrapper.setProps({
      buttonHidden: true,
    });
    expect(wrapper.length).toEqual(1);
  });
});
