import { getSubtaskListAsArray, getVisibleSubtasks } from '../Subtask/subtaskUtils';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../Subtask/subtaskFilterTypes';

const subtaskListAsObject = {
  '-LiSG0ebzqOO5pchBdA': {
    completed: false,
    text: 'Test text 1',
  },
  '-LiSG0ebzqOO5pchBdB': {
    completed: true,
    text: 'Test text 2',
  },
};
const subtaskListAsArray = [
  { text: 'Test text 1', completed: false, id: '-LiSG0ebzqOO5pchBdA' },
  { text: 'Test text 2', completed: true, id: '-LiSG0ebzqOO5pchBdB' },
];

describe('Testing utility functions for SubtaskList component', () => {
  it('should return valid array of subtask objects', () => {
    const result = getSubtaskListAsArray(subtaskListAsObject);
    expect(result).toEqual(subtaskListAsArray);
  });

  it('should return empty array if no parameters passed', () => {
    const result = getSubtaskListAsArray();
    expect(result).toEqual([]);
  });

  it('should return empty array if parameter passed is not an Object', () => {
    const result = getSubtaskListAsArray('asd');
    expect(result).toEqual([]);
  });

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