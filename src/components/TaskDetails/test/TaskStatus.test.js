import React from 'react';
import { shallow } from 'enzyme';
import TaskStatus from '../TaskStatus';

describe('TaskStatus', () => {
  it('should render correctly', () => {
    const component = shallow(<TaskStatus />);
    expect(component).toMatchSnapshot();
  });
});
