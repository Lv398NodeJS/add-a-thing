import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';


describe('Login', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MainView debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<MainView />);

    expect(component).toMatchSnapshot();
  });
});
