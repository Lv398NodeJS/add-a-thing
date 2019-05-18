import React from 'react';
import { shallow } from 'enzyme';
import SubTaskAdd from '../SubTaskAdd/SubTaskAdd';

describe('SubTaskAdd component', () => {
  it('should render correctly and match the snapshot', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    expect(subTaskAddComponent).toMatchSnapshot();
  });

  it('should always render one button with ".add-subtask-button" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    const button = subTaskAddComponent.find('.add-subtask-button');
    expect(button.length).toBe(1);
  });

  it('should always render one text input with ".new-subtask-text" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    const input = subTaskAddComponent.find('.new-subtask-text');
    expect(input.length).toBe(1);
  });

  it('if taskStatus is "Done", then button should be disabled', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd taskStatus="Done" />);
    const button = subTaskAddComponent.find('.add-subtask-button');
    expect(button.prop('disabled')).toBeTruthy();
  });

  it('if taskStatus is "Done", then text input should be disabled', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd taskStatus="Done" />);
    const input = subTaskAddComponent.find('.new-subtask-text');
    expect(input.prop('disabled')).toBeTruthy();
  });
});
