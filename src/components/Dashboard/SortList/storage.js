const storage = {
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

export default storage;
