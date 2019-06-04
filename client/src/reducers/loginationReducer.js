import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  LOGGED_DATA,
} from '../actions/actionTypes';

const initialState = {
  userData: {},
  loggedData: {
    isLoggedIn: false,
  },
  dashboards: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        userData: { ...payload[0] },
      };
    case LOG_IN_USER:
      return {
        ...state,
        userData: { ...payload[0] },
      };
    case LOG_OUT_USER:
      return {
        ...initialState,
      };
    case LOGGED_DATA:
      return {
        ...initialState,
        loggedData: payload,
      };
    default:
      return state;
  }
};
