import * as utils from '../Dashboard/Subtask/SubtaskProgressBar/subtaskProgressBarUtils';

describe('getCompletedSubtasksPercent function', () => {
  it('should return 0 if no parameters were passed', () => {
    const result = utils.getCompletedSubtasksPercent();
    expect(result).toBe(0);
  });

  it('should return 0 if passed passed parameter is an empty object', () => {
    const result = utils.getCompletedSubtasksPercent({});
    expect(result).toBe(0);
  });

  it('should return 0 if passed parameter is not an iterable object', () => {
    const result = utils.getCompletedSubtasksPercent(123);
    expect(result).toBe(0);
  });

  it('should return proper percent for completed subtasks. Zero tasks completed', () => {
    const subtaskList = [{ completed: false }];
    const result = utils.getCompletedSubtasksPercent(subtaskList);
    expect(result).toBe(0);
  });

  it('should return proper percent for completed subtasks. 1/3 tasks completed', () => {
    const subtaskList = [{ completed: true }, { completed: false }, { completed: false }];
    const result = utils.getCompletedSubtasksPercent(subtaskList);
    expect(result).toBe(33);
  });

  it('should return proper percent for completed subtasks. Half tasks completed', () => {
    const subtaskList = [{ completed: true }, { completed: false }];
    const result = utils.getCompletedSubtasksPercent(subtaskList);
    expect(result).toBe(50);
  });

  it('should return proper percent for completed subtasks. 2/3 completed', () => {
    const subtaskList = [{ completed: true }, { completed: true }, { completed: false }];
    const result = utils.getCompletedSubtasksPercent(subtaskList);
    expect(result).toBe(67);
  });

  it('should return proper percent for completed subtasks. All completed', () => {
    const subtaskList = [{ completed: true }];
    const result = utils.getCompletedSubtasksPercent(subtaskList);
    expect(result).toBe(100);
  });
});

describe('getProgressBarVariant function', () => {
  it('should return "secondary" if no parameter was passed', () => {
    const result = utils.getProgressBarVariant();
    expect(result).toBe('secondary');
  });

  it('should return "secondary" if passed parameter is not a number', () => {
    const result = utils.getProgressBarVariant('asd');
    expect(result).toBe('secondary');
  });

  it('should return "success" if passed parameter equals to 100', () => {
    const result = utils.getProgressBarVariant(100);
    expect(result).toBe('success');
  });

  it('should return "info" if passed parameter is > 50 and < 100', () => {
    const result = utils.getProgressBarVariant(55);
    expect(result).toBe('info');
  });

  it('should return "warning" if passed parameter is > 30 and < 50', () => {
    const result = utils.getProgressBarVariant(37);
    expect(result).toBe('warning');
  });

  it('should return "secondary" if passed parameter is < 30', () => {
    const result = utils.getProgressBarVariant(27);
    expect(result).toBe('secondary');
  });
});
