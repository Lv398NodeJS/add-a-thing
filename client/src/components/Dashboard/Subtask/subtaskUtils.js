import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from './subtaskFilterTypes';

export const getVisibleSubtasks = (subtaskList, currentFilter) => {
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