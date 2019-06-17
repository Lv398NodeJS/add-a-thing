import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  LOGGED_IN_USER,
} from '../actions/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
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
      localStorage.setItem('token', payload );
      return {
        ...state,
      };
    case LOGGED_IN_USER:
      return {
        ...state,
        userData: payload,
      };
    case LOG_OUT_USER:
      localStorage.clear();
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
