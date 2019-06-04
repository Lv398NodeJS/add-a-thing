import axios from 'axios';
import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
} from './actionTypes';

export const registerUser = newUserData => (dispatch) => {
  axios
    .post('/users/registerUser', newUserData)
    .then((res) => {
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};

export const loginUser = userData => (dispatch) => {
  axios
    .get(`/users/loginUser/${userData.email}`)
    .then((res) => {
      dispatch({
        type: LOG_IN_USER,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
};
