import React from 'react';
import { shallow } from 'enzyme';
import { PostAddingComponent } from 'PostAdding';

describe('Component PostAdding', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostAddingComponent />);
    expect(component).toBeTruthy();
  });
});
