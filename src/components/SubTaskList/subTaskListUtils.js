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