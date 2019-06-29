const socketIo = require('socket.io');
const configureChatSocket = require('./chat');
const configureSpeechRecognitionSocket = require('./speechRecognition');

const configureSocket = async (server) => {
  const io = socketIo.listen(server);
  io.on('connection', function (client) {
    configureChatSocket(client);
    configureSpeechRecognitionSocket(client);
  });

  return io;
};

module.exports = configureSocket;
