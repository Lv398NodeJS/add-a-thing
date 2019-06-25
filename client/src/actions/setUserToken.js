import axios from 'axios';

const setUserToken = token => {
	if(token) {
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete  axios.defaults.headers.common['x-auth-token'];
	}
};

export default setUserToken;
