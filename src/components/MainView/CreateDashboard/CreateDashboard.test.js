import React from 'react';
import { shallow, mount } from 'enzyme';
import CreateDashboard from './CreateDashboard';
import ModalToCreateDash from './ModalToCreateDash';

describe('CreateDashboard', () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<CreateDashboard debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    const component = shallow(<CreateDashboard />);

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
    const button = createDashboard().find('.createNewDash');
    expect(button.length).toBeGreaterThan(0);
  });

  it('opens modal window when clicked', () => {
    const wrapper = shallow(<CreateDashboard />);
    wrapper.find('.createNewDash').simulate('click');

    expect(wrapper.find(ModalToCreateDash).exists()).toEqual(true);
  });
});
