import axios from 'axios';
import {
  REGISTER_USER,
  LOG_IN_USER,
  LOG_OUT_USER,
  FETCH_DASHES,
	ERROR_HANDLER,
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
    .catch(err => {
    dispatch({
	    type: ERROR_HANDLER,
	    payload: err.response.data,
      });
    });
};

export const loginUser = userData => dispatch => {
  axios
    .post('/users/loginUser', userData)
    .then((res)=>{
		    dispatch({
			    type: LOG_IN_USER,
			    payload: res.data,
		    });
		    return axios
		    .get(`/dashboards/${res.data.userData.id}`);

    })
    .then(res => dispatch({
      type: FETCH_DASHES,
      payload: res.data,
    }))
    .catch(err => {
	    dispatch({
		    type: ERROR_HANDLER,
		    payload: err.response.data,
	    });
    });
};

export const loggedUser = (loggedInData) => dispatch => {
	axios
	.post('/users/loggedIn', loggedInData)
	.then(res => {
		dispatch({
			type: LOG_IN_USER,
			payload: res.data,
		});
		return axios
		.get(`/dashboards/${res.data.userData.id}`);
	})
	.then(res => dispatch({
		type: FETCH_DASHES,
		payload: res.data,
	}))
	.catch(err => console.log(err));
};

export const logOut = () => (dispatch) => {
  dispatch({
    type: LOG_OUT_USER,
  });
};
