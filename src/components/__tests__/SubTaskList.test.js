import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskListComponent } from '../SubTask/SubTaskList/SubTaskList';
import { subtaskFilterTypes } from '../SubTask/subTaskFilterTypes';


const subTaskActions = {
  fetchInfoForSubTaskList: jest.fn(),
};
const subtaskList = [
  { completed: false, id: '1', text: 'Test subtask 1' },
  { completed: false, id: '2', text: 'Test subtask 2' },
  { completed: false, id: '3', text: 'Test subtask 3' },
];
const subTaskListComponent = shallow(
  <SubTaskListComponent
    subtaskList={subtaskList}
    subTaskListActions={subTaskActions}
    currentFilter={subtaskFilterTypes.SHOW_ALL}
  />,
);

describe('SubTaskList component', () => {
  it('should render correctly and match the snapshot', () => {
    expect(subTaskListComponent).toMatchSnapshot();
  });
});
