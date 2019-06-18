const express = require('express');
const router = express.Router();

const Task = require('../models/Task');
const Dashboard = require('../models/Dashboard');

// @route GET /:dashboardId
// @desc Fetch ALL tasks
router.get('/:dashboardId', (req, res) => {
  const { dashboardId } = req.params;
  Task.find({
    dashboardId,
  })
    .then(tasks => res.json(tasks));
});

// @route GET /dashboardName/:dashboardId
// @desc Fetch dashboard name
router.get('/dashboardName/:dashboardId', (req, res) => {
  const { dashboardId } = req.params;
  Dashboard.findById( dashboardId )
  .then(dashboard => res.json(dashboard.name));

});

// @route GET /:dashboardId/:id
// @desc Fetch ONE task
router.get('/:dashboardId/:id', (req, res) => {
  const { id } = req.params;
  Task.findById(id)
    .then(task => res.json(task));
});

// @route POST /:dashboardId
// @desc Post one task
router.post('/:dashboardId', (req, res) => {
  const { dashboardId } = req.params;
  const {
    name, description, status, priority,
  } = req.body;
  const newTask = new Task({
    name,
    description,
    status,
    priority,
    dashboardId,
  });

  newTask.save().then(task => res.json(task));
});

// @route PUT /:taskId
// @desc Update an existing task
router.put('/task/:taskId', (req, res) => {
  const {
    name,
    description,
    status,
    priority,
  } = req.body;
  Task
    .findById(req.params.taskId)
    .then(task => {
      task.name = name;
      task.description = description;
      task.status = status;
      task.priority = priority;
      task.save();
      res.send(task)
    });
});

// @route DELETE /:taskId
//@desc Delete one task
router.delete('/:taskId', (req, res) => {
  const { taskId } = req.params;
  Task.findById(taskId)
    .then(task => task.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;
