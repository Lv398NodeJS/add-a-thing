import React from 'react';
import { shallow } from 'enzyme';
import SubTaskProgressBar from './SubTaskProgressBar';

describe('SubTaskProgressBar component', () => {
  it('should render correctly with no props', () => {
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar />);
    expect(subTaskProgressBarComponent).toMatchSnapshot();
  });

  it('should render progress bar "now" value properly', () => {
    const subtaskList = [{ completed: true }, { completed: false }];
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar subtaskList={subtaskList} />);
    expect(subTaskProgressBarComponent.find('.subtask-progressbar').props().now).toBe(50);
  });

  it('should render progressbar variant for 100% completed subtasks properly', () => {
    const subtaskList = [{ completed: true }];
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar subtaskList={subtaskList} />);
    expect(subTaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'success',
    );
  });

  it('should render progressbar variant for >50% completed subtasks properly', () => {
    const subtaskList = [{ completed: true }, { completed: true }, { completed: false }];
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar subtaskList={subtaskList} />);
    expect(subTaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe('info');
  });

  it('should render progressbar variant for < 30% completed subtasks properly', () => {
    const subtaskList = [{ completed: false }];
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar subtaskList={subtaskList} />);
    expect(subTaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'secondary',
    );
  });

  it('should render progressbar variant properly even if there is no subtasks in subtaskList', () => {
    const subtaskList = [];
    const subTaskProgressBarComponent = shallow(<SubTaskProgressBar subtaskList={subtaskList} />);
    expect(subTaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'secondary',
    );
  });
});
