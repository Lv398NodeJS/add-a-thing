import { SET_SORT } from '@actions/actionTypes';
import { storage } from '@Dashboard/SortList/sortUtils';

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

export {
  setSort,
};
