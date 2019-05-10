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

export const getSortIconColor = (title) => {
  switch (title) {
    case 'To Do':
      return 'rgb(103, 102, 106)';
    case 'In Progress':
      return 'rgb(118, 183, 192)';
    case 'Done':
      return 'rgb(194, 105, 95)';
    default:
      return 'rgb(78, 26, 235)';
  }
};
