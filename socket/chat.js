const Message = require('../models/Message');
const sleep = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const messages = [];
let messagesLoaded = false;
Message.find().sort({date: 1}).then((loadedMessages) => {
  messages.push(...loadedMessages);
  messagesLoaded = true;
  console.log('CHAT>', 'loaded', messages.length, 'messages from database');
});

async function configureChatSocket(socket) {
  while (!messagesLoaded) {
    await sleep(50);
  }
  messages.forEach(message => socket.emit('MESSAGE_NEW', message));

  socket.on('PUSH_MESSAGE', async (pushedMessage) => {
    const {text, userName} = pushedMessage;

    // ONLY FOR DEVELOPMENT
    if (text === '/clear') {
      messages.forEach(message => message.remove());
      messages.length = 0;
      io.sockets.emit('CLEAR_MESSAGES');
      console.log('CHAT>', 'CHAT WAS CLEARED');
      return;
    }

    console.log('CHAT>', text);

    const newMessage = new Message({
      text,
      userName,
    });

    const savedMessage = await newMessage.save();
    io.sockets.emit('MESSAGE_NEW', savedMessage);
    messages.push(savedMessage);
  });
}

module.exports = configureChatSocket;
