export const getProgressBarVariant = (percent = 0) => {
  switch (true) {
    case percent === 100:
      return 'success';
    case percent > 50:
      return 'info';
    case percent > 30:
      return 'warning';
    default:
      return 'secondary';
  }
};

export const getCompletedSubtasksPercent = (subtaskList = {}) => {
  if (!Object.keys(subtaskList).length) return 0;
  const completedSubtasks = subtaskList.filter(subtask => subtask.completed);
  const completedSubtasksPercent = (completedSubtasks.length / subtaskList.length) * 100;
  return Math.round(completedSubtasksPercent);
};
