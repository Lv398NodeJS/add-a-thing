import React from 'react';
import { shallow } from 'enzyme';
import { SubTaskAddComponent } from '../SubTaskAdd/SubTaskAdd';

describe('SubTaskAdd component', () => {
  const subTaskListActions = {
    addSubTask: jest.fn(),
  };
  it('should render correctly and match the snapshot', () => {
    const subTaskAddComponent = shallow(<SubTaskAddComponent subTaskListActions={subTaskListActions} />);
    expect(subTaskAddComponent).toMatchSnapshot();
  });

  it('should always render one button with ".add-subtask-button" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAddComponent subTaskListActions={subTaskListActions} />);
    const button = subTaskAddComponent.find('.add-subtask-button');
    expect(button.length).toBe(1);
  });

  it('should always render one text input with ".new-subtask-text" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAddComponent subTaskListActions={subTaskListActions} />);
    const input = subTaskAddComponent.find('.new-subtask-text');
    expect(input.length).toBe(1);
  });

  it('if taskStatus is "Done", then button should be disabled', () => {
    const subTaskAddComponent = shallow(<SubTaskAddComponent taskStatus="Done" subTaskListActions={subTaskListActions} />);
    const button = subTaskAddComponent.find('.add-subtask-button');
    expect(button.prop('disabled')).toBeTruthy();
  });

  it('if taskStatus is "Done", then text input should be disabled', () => {
    const subTaskAddComponent = shallow(<SubTaskAddComponent taskStatus="Done" subTaskListActions={subTaskListActions} />);
    const input = subTaskAddComponent.find('.new-subtask-text');
    expect(input.prop('disabled')).toBeTruthy();
  });
});
