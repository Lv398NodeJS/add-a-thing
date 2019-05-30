import { SET_SORT } from './actionTypes';
import { storage } from '../components/Dashboard/SortList/sortUtils';

const setSort = (key, field, direction) => (dispatch) => {
  storage.set(key, {
    field,
    direction,
  });

  dispatch({
    type: SET_SORT,
    key,
    field,
    direction,
  });
};

const loadSort = key => (dispatch) => {
  const data = storage.get(key) || {};
  const { field, direction } = data;
  setSort(key, field, direction)(dispatch);
};

export {
  setSort,
  loadSort,
};
