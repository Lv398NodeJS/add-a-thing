export default (title) => {
  switch (title) {
    case 'To Do':
      return 'tasksColumnToDoTitle';
    case 'In Progress':
      return 'tasksColumnInProgressTitle';
    case 'Done':
      return 'tasksColumnDoneTitle';
    default:
      return 'tasksColumnInvalidTitle';
  }
};
