import React from 'react';
import { shallow } from 'enzyme';
import EditDescription from '../EditDescription';

describe('EditDescription', () => {
  it('should render correctly', () => {
    const component = shallow(<EditDescription />);
    expect(component).toMatchSnapshot();
  });
});
