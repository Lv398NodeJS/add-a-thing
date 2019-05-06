export const getTaskRef = (props) => {
  const { taskListRef, id } = props;
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (props) => {
  const { priority, status } = props;
  let style = status === 'Done' ? 'taskItemDone' : 'taskItem';
  switch (priority) {
    case 'High':
      style += ' priorityH';
      break;
    case 'Medium':
      style += ' priorityM';
      break;
    case 'Low':
      style += ' priorityL';
      break;
    default:
  }
  return style;
};
