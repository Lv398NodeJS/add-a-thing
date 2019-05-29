import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskListComponent } from '../Subtask/SubtaskList/SubtaskList';
import { SHOW_ALL } from '../Subtask/subtaskFilterTypes';


const subtaskActions = {
  fetchInfoForSubtaskList: jest.fn(),
};
const subtaskList = [
  { completed: false, id: '1', text: 'Test subtask 1' },
  { completed: false, id: '2', text: 'Test subtask 2' },
  { completed: false, id: '3', text: 'Test subtask 3' },
];
const subtaskListComponent = shallow(
  <SubtaskListComponent
    subtaskList={subtaskList}
    subtaskActions={subtaskActions}
    currentFilter={SHOW_ALL}
  />,
);

describe('SubtaskList component', () => {
  it('should render correctly and match the snapshot', () => {
    expect(subtaskListComponent).toMatchSnapshot();
  });
});
