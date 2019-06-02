import { SET_SORT } from '@actions/actionTypes';

export default (state = {}, action) => {
  const {
    key,
    field,
    direction,
  } = action;
  switch (action.type) {
    case SET_SORT:
      return {
        ...state,
        [key]: {
          field,
          direction,
        },
      };
    default:
      return state;
  }
};
