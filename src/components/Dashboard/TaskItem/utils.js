export const getTaskRef = (taskListRef, id) => {
  const taskRef = taskListRef.child(`${id}`);
  return taskRef;
};

export const getTaskStyleByPriority = (priority) => {
  const baseClass = 'task-item d-flex justify-content-between';
  const priorityClass = `${priority}-task`;
  const finalStyle = priority ? `${baseClass} ${priorityClass}` : `${baseClass}`;
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
}

export const dragEnd = (event) => {
  event.target.classList.remove('dragged');
  const fakeTask = document.getElementsByClassName('drag-avatar');
  while (fakeTask.length > 0) fakeTask[0].remove();
}
