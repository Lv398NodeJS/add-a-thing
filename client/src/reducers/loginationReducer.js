import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
} from '../actions/actionTypes';

const initialState = {
  userData: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        userData: payload,
      };
    case LOG_IN_USER:
      return {
        ...state,
        userData: payload,
      };
    case LOG_OUT_USER:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
