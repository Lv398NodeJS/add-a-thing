import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  ERROR_HANDLER,
} from '../actions/actionTypes';

const initialState = {
  token: null,
  userData: {},
  dashboards: [],
  userDataError: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER:
      return {
        ...state,
        userData: payload,
        userDataError: {},
      };
    case LOG_IN_USER:
      localStorage.setItem('token', payload.token );
      return {
        ...state,
        userData: payload.userData,
        userDataError: {},
      };
    case ERROR_HANDLER:
      return {
        ...state,
        userDataError: payload,
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
