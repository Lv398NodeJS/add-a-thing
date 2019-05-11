import React from 'react';
import { shallow } from 'enzyme';
import DeleteTask from '../DeleteTask';

describe('DeleteTask', () => {
  it('should render correctly', () => {
    const component = shallow(<DeleteTask />);
    expect(component).toMatchSnapshot();
  });
});
