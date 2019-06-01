import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskItemComponent } from '../Subtask/SubtaskItem/SubtaskItem';

describe('SubtaskItem component', () => {
  const subtaskActions = {
    changeSubtaskStatus: jest.fn(),
    deleteSubtask: jest.fn(),
    convertToTask: jest.fn(),
  };
  it('should render correctly and match the snapshot', () => {
    const subtaskItemComponent = shallow(
      <SubtaskItemComponent subtaskActions={subtaskActions} />,
    );
    expect(subtaskItemComponent).toMatchSnapshot();
  });

  // it('should render subtask text properly', () => {
  //   const text = 'Subtask test text';
  //   const subtaskItemComponent = shallow(
  //     <SubtaskItemComponent
  //       text={text}
  //       subtaskActions={subtaskActions}
  //     />,
  //   );
  //   expect(subtaskItemComponent.find('FormCheckLabel').text()).toBe(text);
  // });

  it('should render subtask checkbox properly according to subtask completion status', () => {
    const completed = true;
    const subtaskItemComponent = shallow(
      <SubtaskItemComponent
        completed={completed}
        subtaskActions={subtaskActions}
      />,
    );
    expect(subtaskItemComponent.find('FormCheckInput').props().checked).toBe(completed);
  });
});
