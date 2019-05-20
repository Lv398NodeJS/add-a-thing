export const sort = (array, field, direction = 'ASC') => {
  const copiedArray = [...array]; // For immutability

  copiedArray.sort((a, b) => {
    if (direction === 'NONE') {
      return 0;
    }

    let compareA = String(a[field]).toLowerCase();
    let compareB = String(b[field]).toLowerCase();

    if (field === 'priority') {
      compareA = ['Low', 'Medium', 'High'].indexOf(compareA);
      compareB = ['Low', 'Medium', 'High'].indexOf(compareB);
    }

    return compareA.localeCompare(compareB);
  });

  if (direction === 'DESC') {
    copiedArray.reverse();
  }

  return copiedArray;
};

export const storage = {
  get: (key) => {
    let data = localStorage.getItem('SortList_Data') || '{}';
    data = JSON.parse(data);
    return data[key];
  },

  set: (key, value) => {
    let data = localStorage.getItem('SortList_Data') || '{}';
    data = JSON.parse(data);
    data[key] = value;
    data = JSON.stringify(data);
    localStorage.setItem('SortList_Data', data);
  },
};
