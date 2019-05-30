export const sortComparer = (field, direction = 'ASC') => (a, b) => {
  if (direction === 'NONE') {
    return 0;
  }

  let compareA = String(a[field]).toLowerCase();
  let compareB = String(b[field]).toLowerCase();

  if (field === 'priority') {
    compareA = String(['low', 'medium', 'high'].indexOf(compareA));
    compareB = String(['low', 'medium', 'high'].indexOf(compareB));
  }

  const directionMultiplier = direction === 'ASC' ? 1 : -1;
  return compareA.localeCompare(compareB) * directionMultiplier;
};

export const storage = {
  get: (key) => {
    let data = localStorage.getItem('SortList_Data') || '{}';
    data = JSON.parse(data);
    return data[key];
  },

  set: (key, value) => {
    const sortListDataRaw = localStorage.getItem('SortList_Data') || '{}';
    const sortListData = JSON.parse(sortListDataRaw);
    sortListData[key] = value;
    localStorage.setItem('SortList_Data', JSON.stringify(sortListData));
  },
};
