import React from 'react';
import { shallow } from 'enzyme';
import TaskPriority from '../TaskPriority';

describe('TaskPriority', () => {
  it('should render correctly', () => {
    const component = shallow(<TaskPriority />);
    expect(component).toMatchSnapshot();
  });
});
