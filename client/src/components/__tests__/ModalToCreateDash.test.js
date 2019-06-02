import React from 'react';
import { shallow } from 'enzyme';
import { ModalToCreateDash } from '../MainView/CreateDashboard/ModalToCreateDash/ModalToCreateDash';

describe('ModalToCreateDash', () => {
  const component = shallow(
    <ModalToCreateDash />,
  );

  it('should render correctly in "debug" mode', () => {
    const componentDebug = shallow(
      <ModalToCreateDash debug />,
    );

    expect(componentDebug).toMatchSnapshot();
  });

  it('should render correctly with no props', () => {
    expect(component).toMatchSnapshot();
  });

  it('input fields should be filled correctly', () => {
    const dashInfo = { dashName: 'The awesome dashboard', dashDescriprtion: 'How awesome am I?' };
    expect(component.find('.dash-name').length).toBe(1);

    const nameInput = component.find('.dash-name');
    nameInput.value = dashInfo.dashName;
    expect(nameInput.value).toBe('The awesome dashboard');

    const descInput = component.find('.dash-description');
    descInput.value = dashInfo.dashDescriprtion;
    expect(descInput.value).toBe('How awesome am I?');
  });

  it("'Save changes' button should be disabled if dash name input field is empty", () => {
    expect(component.find('.save-changes').props().disabled).toBe(true);
  });

  it("'Save changes' button should be enabled when dash name input field is not empty", () => {
    component.setState({ dashName: 'I am not empty!' });

    expect(component.find('.save-changes').props().disabled).toBe(false);
  });

  it('closes modal window when close button clicked', () => {
    const shallowWithProps = shallow(
      <ModalToCreateDash closeModal={jest.fn()} />,
    );

    shallowWithProps.setState({ show: false });
    shallowWithProps.find('.close-button').simulate('click');

    expect(shallowWithProps.state().show).toEqual(false);
  });

  it("closes when 'Save changes' button clicked", () => {
    const shallowWithProps = shallow(
      <ModalToCreateDash
        closeModal={jest.fn()}
        mainViewActions={{ addDashboard: jest.fn() }}
      />,
    );

    shallowWithProps.setState({
      show: true,
      dashName: 'I am not empty!',
    });
    shallowWithProps.find('.save-changes').simulate('click');

    expect(shallowWithProps.state().show).toEqual(false);
  });
});
