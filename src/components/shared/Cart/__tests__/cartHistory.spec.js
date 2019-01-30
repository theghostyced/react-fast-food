import { shallow } from 'enzyme';
import React from 'react';
import CartHistoryItem from '../CartHistoryItem.jsx';

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
    wrapper = shallow(<CartHistoryItem {...props} />);
  });

  it('it should render a CartHistoryItem Component', () => {
    expect(wrapper.length).toEqual(1);
  });
});
