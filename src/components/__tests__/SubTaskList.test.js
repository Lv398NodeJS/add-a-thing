import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskList } from '../SubTaskList/SubTaskList';

const subTaskListActions = {
  fetchInfoForSubTaskList: jest.fn(),
};
const subtaskList = [
  { completed: false, id: '1', text: 'Test subtask 1' },
  { completed: false, id: '2', text: 'Test subtask 2' },
  { completed: false, id: '3', text: 'Test subtask 3' },
];
const subTaskListComponent = shallow(
  <SubTaskList
    subtaskList={subtaskList}
    subTaskListActions={subTaskListActions}
  />,
);

describe('SubTaskList component', () => {
  it('should render correctly and match the snapshot', () => {
    expect(subTaskListComponent).toMatchSnapshot();
  });

  it('should render SubTaskProgressBar child component', () => {
    expect(subTaskListComponent.find('SubTaskProgressBar').length).toBe(1);
  });
});
