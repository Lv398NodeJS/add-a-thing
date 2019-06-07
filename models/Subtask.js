const mongoose = require('mongoose');

const { Schema } = mongoose;
const SubtaskSchema = new Schema({
  name: {
    type: String,
  },
  completed: Boolean,
  taskId: {
    type: Schema.Types.ObjectId,
    ref: 'Task',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Subtask = mongoose.model('Subtask', SubtaskSchema);
