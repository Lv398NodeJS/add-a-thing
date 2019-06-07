const mongoose = require('mongoose');

const Subtask = require('./Subtask');

const { Schema } = mongoose;
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  status: {
    type: String,
    default: 'To Do',
  },
  priority: {
    type: String,
    default: 'Medium',
  },
  dashboardId: {
    type: Schema.Types.ObjectId,
    ref: 'Dashboard',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  subtasks: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Subtask'
  }]
});

module.exports = Task = mongoose.model('Task', TaskSchema);
