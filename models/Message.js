const mongoose = require('mongoose');

const { Schema } = mongoose;
const MessageSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    default: 'Anonymous',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Message = mongoose.model('Message', MessageSchema);
