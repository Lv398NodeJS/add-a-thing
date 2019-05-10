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

export const loaderColor = (title) => {
  switch (title) {
    case 'To Do':
      return '#67666a';
    case 'In Progress':
      return '#749a9f';
    case 'Done':
      return '#bf867b';
    default:
      return '#4e1aeb';
  }
};
