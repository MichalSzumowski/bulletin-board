import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const component = shallow(<Homepage />);
    expect(component).toBeTruthy();
  });
});
