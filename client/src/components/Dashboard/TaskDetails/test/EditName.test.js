import React from 'react';
import { shallow } from 'enzyme';
import EditName from '../EditName';

describe('EditName', () => {
  it('should render correctly', () => {
    const component = shallow(<EditName />);
    expect(component).toMatchSnapshot();
  });
});
