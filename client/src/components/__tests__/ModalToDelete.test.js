import React from 'react';
import { shallow } from 'enzyme';
import { ModalToDelete } from '../MainView/ListOfDashboards/DashboardPreview/ModalToDelete/ModalToDelete';

describe('ModalToDelete', () => {
  const component = shallow(<ModalToDelete />);
  it('should render correctly in "debug" mode', () => {
    const componentDebug = shallow(<ModalToDelete debug />);

    expect(componentDebug).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    expect(component).toMatchSnapshot();
  });

  it("closes modal window when 'Cancel' button clicked", () => {
    const shallowWithProps = shallow(<ModalToDelete toggleModal={jest.fn()} />);

    shallowWithProps.setState({ show: true });
    shallowWithProps.find('.cancel-btn').simulate('click');
    shallowWithProps.update();

    expect(shallowWithProps.state().show).toEqual(false);
  });
});
