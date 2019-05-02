import React from 'react';
import { shallow } from 'enzyme';
import SubTaskList from './SubTaskList';

const subTaskListComponent = shallow(<SubTaskList />);
subTaskListComponent.setState({
  subtaskList: [
    { completed: false, id: '1', text: 'Test subtask 1' },
    { completed: false, id: '2', text: 'Test subtask 2' },
    { completed: false, id: '3', text: 'Test subtask 3' },
  ],
});

describe('SubTaskList component', () => {
  it('should render correctly and match the snapshot', () => {
    expect(subTaskListComponent).toMatchSnapshot();
  });

  it('should render SubTaskProgressBar child component', () => {
    expect(subTaskListComponent.find('SubTaskProgressBar').length).toBe(1);
  });

  it('should render SubTaskItem component for each sub task object in subtaskList array in state', () => {
    expect(subTaskListComponent.find('SubTaskItem').length).toBe(3);
  });

  it('should render SubTaskAdd child component', () => {
    expect(subTaskListComponent.find('SubTaskAdd').length).toBe(1);
  });
});
