import React from 'react';
import { shallow } from 'enzyme';
import SubTaskItem from './SubTaskItem';

describe('SubTaskItem component', () => {
  it('should render correctly and match the snapshot', () => {
    const subTaskItemComponent = shallow(<SubTaskItem />);
    expect(subTaskItemComponent).toMatchSnapshot();
  });

  it('should render subtask text properly', () => {
    const text = 'Subtask test text';
    const subTaskItemComponent = shallow(<SubTaskItem text={text} />);
    expect(subTaskItemComponent.find('FormCheckLabel').text()).toBe(text);
  });

  it('should render subtask checkbox and its label properly', () => {
    const completed = true;
    const subTaskItemComponent = shallow(<SubTaskItem completed={completed} />);
    expect(subTaskItemComponent.find('FormCheckInput').props().checked).toBe(completed);
    expect(subTaskItemComponent.find('FormCheckLabel').hasClass('subtask-completed')).toBe(
      completed,
    );
  });
});
