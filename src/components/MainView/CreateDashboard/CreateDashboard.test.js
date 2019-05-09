import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateDashboard from './CreateDashboard';

describe('CreateDashboard', () => {
  const component = shallow(<CreateDashboard />);
  it('should render correctly in "debug" mode', () => {
    const componentDebug = shallow(<CreateDashboard debug />);

    expect(componentDebug).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    expect(component).toMatchSnapshot();
  });

  let mountedCreateBtn;

  const createDashboard = () => {
    if (!mountedCreateBtn) {
      mountedCreateBtn = mount(
        <CreateDashboard />,
      );
    }
    return mountedCreateBtn;
  };

  it('always renders the button', () => {
    const button = createDashboard().find('.createDash');
    expect(button.length).toBeGreaterThan(0);
  });

  it('opens modal window when clicked', () => {
    component.find('.createDash').simulate('click');

    expect(component.state().showComponent).toEqual(true);
  });
});
