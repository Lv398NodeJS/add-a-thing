import React from 'react';
import { shallow } from 'enzyme';
import MainView from './MainView';

describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<MainView debug />);

    expect(component).toMatchSnapshot();
  });
});
