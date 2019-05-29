import { subtaskFilterTypes } from './subTaskFilterTypes';

export const getSubtaskListAsArray = (snapValue = {}) => {
  if (typeof snapValue !== 'object' && snapValue.constructor !== Object) return [];
  const subtaskList = [];
  Object.keys(snapValue).forEach((subtask) => {
    const { text, completed } = snapValue[subtask];
    subtaskList.push({
      text,
      completed,
      id: subtask,
    });
  });
  return subtaskList;
};

export const getVisibleSubTasks = (subtaskList, currentFilter) => {
  const { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } = subtaskFilterTypes;
  switch (currentFilter) {
    case SHOW_ALL:
      return subtaskList;
    case SHOW_COMPLETED:
      return subtaskList.filter(subtask => subtask.completed);
    case SHOW_ACTIVE:
      return subtaskList.filter(subtask => !subtask.completed);
    default:
      throw new Error(`Unknown filter: ${currentFilter}`);
  }
}