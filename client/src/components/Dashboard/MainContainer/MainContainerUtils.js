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

export const deleteDragByEvent = (event, type) => {
  event.preventDefault();
  if (type === 'over') {
    document.getElementById('delete-zone').classList.add('drag-in');
  } else if (type === 'leave') {
    document.getElementById('delete-zone').classList.remove('drag-in');
  }
};

export const handleDeleteDropCSS = () => {
  const fakeTask = document.getElementById('drag-avatar');
  document.getElementsByClassName('dragged-task')[0].remove();
  if (fakeTask != null) fakeTask.remove();
  document.getElementById('delete-zone').classList.remove('drag-in');
  const DELETE_DELAY = 150;
  setTimeout(() => document.getElementById('delete-zone').classList.remove('shown'), DELETE_DELAY);
};
