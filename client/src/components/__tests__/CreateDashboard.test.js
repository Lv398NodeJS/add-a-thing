import React from 'react';
import { shallow } from 'enzyme';
import CreateDashboard from '../MainView/CreateDashboard/CreateDashboard';

describe('CreateDashboard', () => {
  const component = shallow(<CreateDashboard />);
  it('should render correctly in "debug" mode', () => {
    const componentDebug = shallow(<CreateDashboard debug />);

    expect(componentDebug).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    expect(component).toMatchSnapshot();
  });

  it('always renders the button', () => {
    const button = component.find('.createDash');
    expect(button.length).toBeGreaterThan(0);
  });

  it('opens modal window when clicked', () => {
    component.find('.createDash').simulate('click');

    expect(component.state().showComponent).toEqual(true);
  });
});
