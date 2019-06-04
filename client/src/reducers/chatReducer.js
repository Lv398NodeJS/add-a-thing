import {
  SET_CHAT_VISIBILITY,
  ADD_MESSAGE,
  CLEAR_MESSAGES,
} from '../actions/actionTypes';

const initialState = {
  visible: false,
  messages: [],
};

export default (state = initialState, action) => {
  const {
    visible,
    message,
  } = action;

  switch (action.type) {
    case SET_CHAT_VISIBILITY:
      return {
        ...state,
        visible,
      };

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, message],
      };

    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: [],
      };

    default:
      return state;
  }
};
