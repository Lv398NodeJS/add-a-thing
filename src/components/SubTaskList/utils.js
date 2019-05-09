export const getSubtaskListAsArray = (snapValue = {}) => {
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
