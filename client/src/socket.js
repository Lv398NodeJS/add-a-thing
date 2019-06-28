import io from 'socket.io-client';
import { ADD_MESSAGE, CLEAR_MESSAGES } from './actions/actionTypes';

const socket = io();

const configureSocket = (dispatch) => {
  socket.on('connect', () => {
    console.log('connected');
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    dispatch({ type: CLEAR_MESSAGES });
  });

  socket.on('MESSAGE_NEW', (message) => {
    dispatch({ type: ADD_MESSAGE, message });
  });

  socket.on('CLEAR_MESSAGES', () => {
    dispatch({ type: CLEAR_MESSAGES });
  });

  return socket;
};

export const sendMessage = (messageText, userName) => {
  const messageObject = {
    text: messageText,
    userName,
  };
  socket.emit('PUSH_MESSAGE', messageObject);
};

export default configureSocket;
