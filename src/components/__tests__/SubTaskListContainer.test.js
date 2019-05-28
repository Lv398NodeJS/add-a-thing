import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskListContainerComponent } from '../SubTask/SubTaskListContainer';

describe('SubTaskListContainer component', () => {
  const subTaskListContainerComponent = shallow(
    <SubTaskListContainerComponent />,
  );

  it('should render correctly and match the snapshot', () => {
    expect(subTaskListContainerComponent).toMatchSnapshot();
  });

  it('should render Bootstrap 4 Container component', () => {
    expect(subTaskListContainerComponent.find('Container').length).toBe(1);
  });

  it('should render Bootstrap 4 Row component', () => {
    expect(subTaskListContainerComponent.find('Bootstrap(Row)').length).toBe(1);
  });

  it('should render two Bootstrap 4 Col components', () => {
    expect(subTaskListContainerComponent.find('Col').length).toBe(2);
  });

  it('should render SubTaskProgressBar child component', () => {
    expect(subTaskListContainerComponent.find('SubTaskProgressBar').length).toBe(1);
  });

  it('should render SubTaskFilterContainer child component', () => {
    expect(subTaskListContainerComponent.find('SubTaskFilterContainer').length).toBe(1);
  });
});
