import React from 'react';
import { shallow } from 'enzyme';
import { SubtaskAddComponent } from '../Subtask/SubtaskAdd/SubtaskAdd';

describe('SubtaskAdd component', () => {
  const subtaskListActions = {
    addSubtask: jest.fn(),
  };
  it('should render correctly and match the snapshot', () => {
    const subtaskAddComponent = shallow(
      <SubtaskAddComponent subtaskListActions={subtaskListActions} />,
    );
    expect(subtaskAddComponent).toMatchSnapshot();
  });

  it('should always render one button with ".add-subtask-button" class', () => {
    const subtaskAddComponent = shallow(
      <SubtaskAddComponent subtaskListActions={subtaskListActions} />,
    );
    const button = subtaskAddComponent.find('.add-subtask-button');
    expect(button.length).toBe(1);
  });

  it('should always render one text input with ".new-subtask-text" class', () => {
    const subtaskAddComponent = shallow(
      <SubtaskAddComponent subtaskListActions={subtaskListActions} />,
    );
    const input = subtaskAddComponent.find('.new-subtask-text');
    expect(input.length).toBe(1);
  });

  it('if taskStatus is "Done", then button should be disabled', () => {
    const subtaskAddComponent = shallow(<SubtaskAddComponent taskStatus="Done" subtaskListActions={subtaskListActions} />);
    const button = subtaskAddComponent.find('.add-subtask-button');
    expect(button.prop('disabled')).toBeTruthy();
  });

  it('if taskStatus is "Done", then text input should be disabled', () => {
    const subtaskAddComponent = shallow(<SubtaskAddComponent taskStatus="Done" subtaskListActions={subtaskListActions} />);
    const input = subtaskAddComponent.find('.new-subtask-text');
    expect(input.prop('disabled')).toBeTruthy();
  });
});
