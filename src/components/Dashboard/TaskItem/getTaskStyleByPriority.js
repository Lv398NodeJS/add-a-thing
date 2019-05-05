export default (priority, status) => {
  let style = status === 'Done' ? 'taskItemDone' : 'taskItem';
  switch (priority) {
    case 'High':
      style += ' priorityH';
      break;
    case 'Medium':
      style += ' priorityM';
      break;
    case 'Low':
      style += ' priorityL';
      break;
    default:
      break;
  }
  return style;
};
