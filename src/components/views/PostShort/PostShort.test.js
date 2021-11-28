import React from 'react';
import { shallow } from 'enzyme';
import { PostShortComponent } from './PostShort';

describe('Component PostShort', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostShortComponent />);
    expect(component).toBeTruthy();
  });
});
