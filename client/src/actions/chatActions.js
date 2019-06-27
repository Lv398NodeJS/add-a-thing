import {
  SET_CHAT_VISIBILITY,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from './actionTypes';

const setChatVisibility = visibility => (dispatch) => {
  dispatch({
    type: SET_CHAT_VISIBILITY,
    visible: visibility,
  });
};

const addMessage = message => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    message,
  });
};

const clearMessages = () => (dispatch) => {
  dispatch({
    type: CLEAR_MESSAGES,
  });
};

export {
  setChatVisibility,
  addMessage,
  clearMessages,
};
