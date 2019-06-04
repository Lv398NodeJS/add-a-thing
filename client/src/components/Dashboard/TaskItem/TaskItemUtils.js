export const getTaskStyleByPriority = (priority) => {
  const priorityClass = `${priority}-task`;
  const finalStyle = `task-item d-flex justify-content-start ${priority && priorityClass}`;
  return finalStyle;
};

export const getTaskStyleByStatus = (status) => {
  const style = status === 'Done' ? 'task-item-crossed' : '';
  return style;
};

export const dragStart = (event) => {
  event.dataTransfer.setData('taskID', event.target.id);
  event.target.classList.add('dragged', 'dragged-task');

  const fakeTask = event.target.cloneNode(true);
  fakeTask.setAttribute('id', 'drag-avatar');
  event.target.parentNode.parentNode.appendChild(fakeTask);

  event.dataTransfer.setDragImage(fakeTask, 60, 25);
  document.getElementById('delete-zone').classList.add('shown');
};

export const dragEnd = (event) => {
  const fakeTask = document.getElementById('drag-avatar');
  const REMOVE_DELAY = 80;
  if (fakeTask != null) fakeTask.remove();
  event.target.classList.remove('dragged');
  setTimeout(() => document.getElementById('delete-zone').classList.remove('shown'), REMOVE_DELAY);
};
