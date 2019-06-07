import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskListComponent } from '../Subtask/SubtaskList/SubtaskList';
import { SHOW_ALL } from '../Subtask/subtaskFilterTypes';

const subtaskList = [
  { completed: false, _id: '1', name: 'Test subtask 1' },
  { completed: true, _id: '2', name: 'Test subtask 2' },
  { completed: false, _id: '3', name: 'Test subtask 3' },
];
const subtaskListComponent = shallow(
  <SubtaskListComponent
    subtaskList={subtaskList}
    taskStatus="To Do"
    currentFilter={SHOW_ALL}
  />,
);

describe('SubtaskList component', () => {
  it('should render correctly and match the snapshot', () => {
    expect(subtaskListComponent).toMatchSnapshot();
  });

  it('should render proper count of SubtaskItemContainer components', () => {
    expect(subtaskListComponent.find('SubtaskItemContainer').length).toBe(3);
  });
});
