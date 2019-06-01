const express = require('express');
const router = express.Router();

const Subtask = require('../models/Subtask');

// @route GET /
// @desc Fetch all subtasks
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Subtask.find({
    taskId: id,
  })
  .then((subtasks) => {
    res.json(subtasks);
  });
})

// @route POST /
// @desc Post a subtask
router.post('/', (req, res) => {
  const { subTask: { name, completed }, taskId } = req.body;
  const newSubtask = new Subtask({
    name, completed, taskId
  });

  newSubtask.save().then(subtask => res.json(subtask));
});

// @route DELETE /:subtaskId
// @desc Delete a subtask
router.delete('/:subtaskId', (req, res) => {
  const { subtaskId } = req.params;
  Subtask.findById(subtaskId)
    .then(subtask => subtask.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(500).json({ success: false }));
})

// @route PUT /:subtaskId
// @desc Update an existing subtask
router.put('/:subtaskId', (req, res) => {
  const { body: {
      key,
      payload,
    }
  } = req;
  Subtask
    .findById(req.params.subtaskId)
    .then(subtask => {
      subtask[key] = payload;
      subtask.save();
      res.send(subtask);
    });
})

module.exports = router;
