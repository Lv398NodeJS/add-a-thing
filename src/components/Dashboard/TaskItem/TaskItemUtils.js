export const getTaskRef = (taskListRef, id) => {
  const taskRef = (taskListRef && Object.keys(taskListRef).length) && taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (priority) => {
  const priorityClass = `${priority}-task`;
  const finalStyle = `task-item d-flex justify-content-between ${priority && priorityClass}`;
  return finalStyle;
};

export const getTaskStyleByStatus = (status) => {
  const style = status === 'Done' ? 'task-item-crossed' : '';
  return style;
};

export const dragStart = (event) => {
  event.dataTransfer.setData('taskID', event.target.id);
  event.target.classList.add('dragged');

  const fakeTask = event.target.cloneNode(true);
  fakeTask.classList.add('drag-avatar');
  event.target.parentNode.parentNode.appendChild(fakeTask);

  event.dataTransfer.setDragImage(fakeTask, 60, 25);
};

export const dragEnd = (event) => {
  event.target.classList.remove('dragged');
  const fakeTask = document.getElementsByClassName('drag-avatar');
  while (fakeTask.length > 0) fakeTask[0].remove();
};
