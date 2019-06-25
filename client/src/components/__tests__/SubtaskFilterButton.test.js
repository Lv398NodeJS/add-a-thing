import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskFilterButtonComponent } from '../Dashboard/Subtask/SubtaskFilter/SubtaskFilterButton';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../Dashboard/Subtask/subtaskFilterTypes';

describe('SubtaskFilterButton component', () => {
  const subtaskActions = { setSubtaskFilter: jest.fn() };
  it('should render correctly and match the snapshot', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent subtaskActions={subtaskActions} />,
    );
    expect(subtaskFilterButtonComponent).toMatchSnapshot();
  });

  it('should render Bootstrap 4 Button', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent subtaskActions={subtaskActions} />,
    );
    expect(subtaskFilterButtonComponent.find('Button').length).toBe(1);
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent
        subtaskActions={subtaskActions}
        filterType={SHOW_ALL}
      />,
    );
    expect(subtaskFilterButtonComponent.find('Button').text()).toBe('All');
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent
        subtaskActions={subtaskActions}
        filterType={SHOW_ACTIVE}
      />,
    );
    expect(subtaskFilterButtonComponent.find('Button').text()).toBe('Active');
  });

  it('should render Bootstrap 4 Button with text depending on "filterType" prop', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent
        subtaskActions={subtaskActions}
        filterType={SHOW_COMPLETED}
      />,
    );
    expect(subtaskFilterButtonComponent.find('Button').text()).toBe('Completed');
  });

  it('should render active Bootstrap 4 Button if prop "filterType" is equal to prop "currentFilter"', () => {
    const subtaskFilterButtonComponent = shallow(
      <SubtaskFilterButtonComponent
        subtaskActions={subtaskActions}
        filterType={SHOW_COMPLETED}
        currentFilter={SHOW_COMPLETED}
      />,
    );
    expect(subtaskFilterButtonComponent.find('Button').prop('active')).toBeTruthy();
  });
});
