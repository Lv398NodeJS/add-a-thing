export const getTaskRef = (props) => {
  const { taskListRef, id } = props;
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (props) => {
  const { priority, status } = props;
  const lineStyle = status === 'Done' ? 'taskItemDone' : 'taskItem';
  const style = `${lineStyle} ${priority}`;
  return style;
};
