import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskItemComponent } from '../SubTaskList/SubTaskItem/SubTaskItem';

describe('SubTaskItem component', () => {
  const subTaskListActions = {
    changeSubTaskStatus: jest.fn(),
    deleteSubTask: jest.fn(),
    convertToTask: jest.fn(),
  };
  it('should render correctly and match the snapshot', () => {
    const subTaskItemComponent = shallow(
      <SubTaskItemComponent subTaskListActions={subTaskListActions} />,
    );
    expect(subTaskItemComponent).toMatchSnapshot();
  });

  it('should render subtask text properly', () => {
    const text = 'Subtask test text';
    const subTaskItemComponent = shallow(
      <SubTaskItemComponent
        text={text}
        subTaskListActions={subTaskListActions}
      />,
    );
    expect(subTaskItemComponent.find('FormCheckLabel').text()).toBe(text);
  });

  it('should render subtask checkbox properly according to subtask completion status', () => {
    const completed = true;
    const subTaskItemComponent = shallow(
      <SubTaskItemComponent
        completed={completed}
        subTaskListActions={subTaskListActions}
      />,
    );
    expect(subTaskItemComponent.find('FormCheckInput').props().checked).toBe(completed);
  });
});
