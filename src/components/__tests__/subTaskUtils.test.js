import { getSubtaskListAsArray } from '../SubTask/subTaskUtils';

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

describe('Testing utility functions for SubTaskList component', () => {
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
});
