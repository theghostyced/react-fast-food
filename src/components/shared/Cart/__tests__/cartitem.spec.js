import { shallow } from 'enzyme';
import React from 'react';
import CartItem from '../CartItem.jsx';

describe('CartItem Component', () => {
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
  };

  beforeEach(() => {
    wrapper = shallow(<CartItem {...props} />);
  });

  it('it should render a CartItem Component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
