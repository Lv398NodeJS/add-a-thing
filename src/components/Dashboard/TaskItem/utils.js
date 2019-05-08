export const getTaskRef = (taskListRef, id) => {
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (priority) => {
  const baseStyle = 'task-item d-flex justify-content-between';
  const finalStyle = priority ? `${baseStyle} ${priority}` : `${baseStyle}`;
  return finalStyle;
};

export const getTaskStyleByStatus = (status) => {
  const style = status === 'Done' ? 'task-item-crossed' : undefined;
  return style;
};
