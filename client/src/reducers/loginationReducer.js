import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
} from '../actions/actionTypes';

const initialState = {
  token: null,
  userData: {},
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
      localStorage.setItem('token', payload.token );
      return {
        ...state,
        userData: payload.userData,
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
