export const getTaskRef = (props) => {
  const { taskListRef, id } = props;
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (props) => {
  const { priority, status } = props;
  const baseStyle = status === 'Done' ? 'task-item-done' : 'task-item';
  const finalStyle = priority ? `${baseStyle} ${priority}` : `${baseStyle}`;
  return finalStyle;
};
