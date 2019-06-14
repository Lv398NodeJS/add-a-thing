import io from 'socket.io-client';
import { ADD_MESSAGE, CLEAR_MESSAGES } from './actions/actionTypes';

const socket = io('http://localhost:6000');

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

export const sendMessage = (messageText) => {
  const messageObject = {
    text: messageText,
    token: 'Daki', // @TODO: implement token and get user name by token
  };
  socket.emit('PUSH_MESSAGE', messageObject);
};

export default configureSocket;
