import React from 'react';
import { shallow } from 'enzyme';
import { PostEditingComponent } from 'PostEditing';

describe('Component PostEditing', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostEditingComponent />);
    expect(component).toBeTruthy();
  });
}); 