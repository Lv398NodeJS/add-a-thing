import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';


describe('Login', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Login debug />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<Login />);
    expect(component).toMatchSnapshot();
  });
});
