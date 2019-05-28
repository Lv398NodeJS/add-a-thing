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
  switch (currentFilter) {
    case subtaskFilterTypes.SHOW_ALL:
      return subtaskList;
    case subtaskFilterTypes.SHOW_COMPLETED:
      return subtaskList.filter(subtask => subtask.completed);
    case subtaskFilterTypes.SHOW_ACTIVE:
      return subtaskList.filter(subtask => !subtask.completed);
    default:
      throw new Error(`Unknown filter: ${currentFilter}`);
  }
}