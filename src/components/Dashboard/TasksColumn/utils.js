export const columnTitleClass = (title) => {
  switch (title) {
    case 'To Do':
      return 'tasks-column-todo-title';
    case 'In Progress':
      return 'tasks-column-in-progress-title';
    case 'Done':
      return 'tasks-column-done-title';
    default:
      return 'tasks-column-invalid-title';
  }
};
