import React from 'react';
import { shallow } from 'enzyme';
import SubTaskAdd from './SubTaskAdd';

describe('SubTaskAdd component', () => {
  it('should render correctly with no props', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    expect(subTaskAddComponent).toMatchSnapshot();
  });

  it('should always render button with ".add-subtask-button" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    const button = subTaskAddComponent.find('.add-subtask-button');
    expect(button.length).toBeGreaterThan(0);
  });

  it('should always render text input with ".new-subtask-text" class', () => {
    const subTaskAddComponent = shallow(<SubTaskAdd />);
    const input = subTaskAddComponent.find('.new-subtask-text');
    expect(input.length).toBeGreaterThan(0);
  });
});
