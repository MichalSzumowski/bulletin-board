import React from 'react';
import { shallow } from 'enzyme';
import { PostLongComponent } from 'PostLong';

describe('Component PostLong', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostLongComponent />);
    expect(component).toBeTruthy();
  });
}); 