export const getTaskRef = (taskListRef, id) => {
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (props) => {
  const { priority, status } = props;
  const baseStyle = status === 'Done'
    ? 'task-item-done d-flex justify-content-between'
    : 'task-item d-flex justify-content-between';
  const finalStyle = priority ? `${baseStyle} ${priority}` : `${baseStyle}`;
  return finalStyle;
};
