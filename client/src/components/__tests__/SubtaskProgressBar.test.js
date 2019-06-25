import React from 'react';
import { shallow } from 'enzyme';
import SubtaskProgressBar from '../Dashboard/Subtask/SubtaskProgressBar/SubtaskProgressBar';

describe('SubtaskProgressBar component', () => {
  it('should render correctly and match the snapshot', () => {
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar />);
    expect(subtaskProgressBarComponent).toMatchSnapshot();
  });

  it('should render progress bar "now" value properly', () => {
    const subtaskList = [{ completed: true }, { completed: false }];
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar subtaskList={subtaskList} />);
    expect(subtaskProgressBarComponent.find('.subtask-progressbar').props().now).toBe(50);
  });

  it('should render progressbar variant for 100% completed subtasks properly', () => {
    const subtaskList = [{ completed: true }];
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar subtaskList={subtaskList} />);
    expect(subtaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'success',
    );
  });

  it('should render progressbar variant for >50% completed subtasks properly', () => {
    const subtaskList = [{ completed: true }, { completed: true }, { completed: false }];
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar subtaskList={subtaskList} />);
    expect(subtaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe('info');
  });

  it('should render progressbar variant for < 30% completed subtasks properly', () => {
    const subtaskList = [{ completed: false }];
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar subtaskList={subtaskList} />);
    expect(subtaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'secondary',
    );
  });

  it('should render progressbar variant properly even if there is no subtasks in subtaskList', () => {
    const subtaskList = [];
    const subtaskProgressBarComponent = shallow(<SubtaskProgressBar subtaskList={subtaskList} />);
    expect(subtaskProgressBarComponent.find('.subtask-progressbar').props().variant).toBe(
      'secondary',
    );
  });
});
