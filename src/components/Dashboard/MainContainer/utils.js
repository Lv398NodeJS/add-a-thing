export const getTaskListAsArray = (snapValue = {}) => {
  const taskList = [];

  Object.keys(snapValue).forEach(task => (
    taskList.push({
      id: task,
      name: snapValue[task].name,
      priority: snapValue[task].priority,
      description: snapValue[task].description,
      status: snapValue[task].status,
      key: task,
    })));

  return taskList;
};
