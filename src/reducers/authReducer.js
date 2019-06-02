import { LOGIN_ERROR, LOGIN_SUCCESS, SIGNOUT_SUCCESS } from '../actions/actionTypes';

const initialState = {
  user: null,
  redirect: false,
};

export default (state = initialState, action) => {
  console.log('reduce: ', action, state)
  const { type, user } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      console.log('Login success');
      return {
        ...state,
        user: user,
        redirect: true,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: user,
        redirect: false,
      };
    case SIGNOUT_SUCCESS:
      console.log('Signout success');
      return {
        ...state,
        user: user,
        redirect: true,
      };

    default:
      return state;
  }
};
