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

export const changePriority = (getPriority) => {
  let setPriority = '';
  if (getPriority === '1') {
    setPriority = 'High';
  } else if (getPriority === '3') {
    setPriority = 'Low';
  } else {
    setPriority = 'Medium';
  }
  return setPriority;
};
