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

export const deleteDragEnter = (event) => {
  event.preventDefault();
  document.getElementById('delete-can').classList.add('drag-in');
};

export const deleteDragLeave = (event) => {
  event.preventDefault();
  document.getElementById('delete-can').classList.remove('drag-in');
};

export const handleDeleteDropCSS = () => {
  const fakeTask = document.getElementById('drag-avatar');
  if (fakeTask != null) fakeTask.remove();

  document.getElementById('delete-can').classList.remove('drag-in');
  setTimeout(() => document.getElementById('delete-zone').classList.remove('shown'), 150);
};
