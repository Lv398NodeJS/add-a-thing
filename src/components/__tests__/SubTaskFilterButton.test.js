import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskFilterButtonComponent } from '../SubTask/SubTaskFilter/SubTaskFilterButton';
import { subtaskFilterTypes } from '../SubTask/subTaskFilterTypes';

describe('SubTaskFilterButton component', () => {
  const subTaskActions = { setSubTaskFilter: jest.fn() };
  it('should render correctly and match the snapshot', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent subTaskActions={subTaskActions} />,
    );
    expect(subTaskFilterButtonComponent).toMatchSnapshot();
  });

  it('should render Bootstrap 4 Button', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent subTaskActions={subTaskActions} />,
    );
    expect(subTaskFilterButtonComponent.find('Button').length).toBe(1);
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent
        subTaskActions={subTaskActions}
        filterType={subtaskFilterTypes.SHOW_ALL}
      />,
    );
    expect(subTaskFilterButtonComponent.find('Button').text()).toBe('All');
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent
        subTaskActions={subTaskActions}
        filterType={subtaskFilterTypes.SHOW_ACTIVE}
      />,
    );
    expect(subTaskFilterButtonComponent.find('Button').text()).toBe('Active');
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent
        subTaskActions={subTaskActions}
        filterType={subtaskFilterTypes.SHOW_COMPLETED}
      />,
    );
    expect(subTaskFilterButtonComponent.find('Button').text()).toBe('Completed');
  });

  it('should render active Bootstrap 4 Button if prop "filterType" is equal to prop "currentFilter"', () => {
    const subTaskFilterButtonComponent = shallow(
      <SubTaskFilterButtonComponent
        subTaskActions={subTaskActions}
        filterType={subtaskFilterTypes.SHOW_COMPLETED}
        currentFilter={subtaskFilterTypes.SHOW_COMPLETED}
      />,
    );
    expect(subTaskFilterButtonComponent.find('Button').prop('active')).toBeTruthy();
  });
});
