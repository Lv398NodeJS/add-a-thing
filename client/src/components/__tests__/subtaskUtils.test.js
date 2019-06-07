import { getVisibleSubtasks } from '../Subtask/subtaskUtils';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../Subtask/subtaskFilterTypes';

const subtaskListAsArray = [
  { name: 'Test name 1', completed: false, _id: '-LiSG0ebzqOO5pchBdA' },
  { name: 'Test name 2', completed: true, _id: '-LiSG0ebzqOO5pchBdB' },
];

describe('Testing utility functions for SubtaskList component', () => {
  it('should return all subtasks if subtaskFilterType is SHOW_ALL', () => {
    const result = getVisibleSubtasks(subtaskListAsArray, SHOW_ALL);
    expect(result).toEqual(subtaskListAsArray);
  });

  it('should return only active subtasks if subtaskFilterType is SHOW_ACTIVE', () => {
    const result = getVisibleSubtasks(subtaskListAsArray, SHOW_ACTIVE);
    expect(result).toEqual([subtaskListAsArray[0]]);
  });

  it('should return only completed subtasks if subtaskFilterType is SHOW_COMPLETED', () => {
    const result = getVisibleSubtasks(subtaskListAsArray, SHOW_COMPLETED);
    expect(result).toEqual([subtaskListAsArray[1]]);
  });
});
