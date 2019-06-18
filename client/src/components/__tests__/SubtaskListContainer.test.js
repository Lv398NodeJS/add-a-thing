import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskListContainerComponent } from '../Dashboard/Subtask/SubtaskListContainer';

describe('SubtaskListContainer component', () => {
  const subtaskListContainerComponent = shallow(
    <SubtaskListContainerComponent />,
  );

  it('should render correctly and match the snapshot', () => {
    expect(subtaskListContainerComponent).toMatchSnapshot();
  });

  it('should render Bootstrap 4 Container component', () => {
    expect(subtaskListContainerComponent.find('Container').length).toBe(1);
  });

  it('should render Bootstrap 4 Row component', () => {
    expect(subtaskListContainerComponent.find('Bootstrap(Row)').length).toBe(1);
  });

  it('should render two Bootstrap 4 Col components', () => {
    expect(subtaskListContainerComponent.find('Col').length).toBe(2);
  });

  it('should render SubtaskProgressBar child component', () => {
    expect(subtaskListContainerComponent.find('SubtaskProgressBar').length).toBe(1);
  });

  it('should render SubtaskFilterContainer child component', () => {
    expect(subtaskListContainerComponent.find('SubtaskFilterContainer').length).toBe(1);
  });
});
