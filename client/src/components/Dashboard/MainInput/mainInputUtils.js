export const addTaskWithHash = inputData => inputData.slice(0, inputData.length - 2).trim();

export const showPriorityColor = (newPriority) => {
  let style = '';
  switch (newPriority) {
    case 'High':
      style += 'priorityH';
      break;
    case 'Medium':
      style += 'priorityM';
      break;
    case 'Low':
      style += 'priorityL';
      break;
    default:
      break;
  }
  return style;
};

export const getPriority = (enteredPriority) => {
  let newPriority = '';
  if (enteredPriority === '1') {
    newPriority = 'High';
  } else if (enteredPriority === '3') {
    newPriority = 'Low';
  } else {
    newPriority = 'Medium';
  }
  return newPriority;
};
