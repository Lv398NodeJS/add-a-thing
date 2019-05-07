import React from 'react';
import { shallow } from 'enzyme';
import TaskDetails from '../TaskDetails';

describe('TaskDetails', () => {
  it('should render correctly', () => {
    const component = shallow(<TaskDetails />);

    expect(component).toMatchSnapshot();
  });
});
