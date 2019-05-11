const storage = {
  get: (key) => {
    const storageKey = `SortList_Data_${(key || 'null').toString().toLowerCase().replace(/[^0-9a-z]/ig, '')}`;
    let data = localStorage.getItem(storageKey) || '{}';
    data = JSON.parse(data);
    return data;
  },

  set: (key, value) => {
    const storageKey = `SortList_Data_${(key || 'null').toString().toLowerCase().replace(/[^0-9a-z]/ig, '')}`;
    const data = JSON.stringify(value, null, 2);
    localStorage.setItem(storageKey, data);
  },
};

export default storage;
