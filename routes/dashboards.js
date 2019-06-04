const express = require('express');
const router = express.Router();

const Dashboard = require('../models/Dashboard');

// @route GET /
// @desc fetch all dashboards
router.get('/:_id', (req, res) => {
  Dashboard.find({userId: req.params._id})
    .sort({ date: -1 })
    .then(dashboards => res.json(dashboards));
});

// @route POST /
// @desc Post a dashboard
router.post('/', (req, res) => {
  const { name, description, userId } = req.body;
  const newDashboard = new Dashboard({
    name,
    description,
    userId,
  });

  newDashboard.save().then(dashboard => res.json(dashboard));
});

// @route DELETE /
// @desc Delete a dashboard
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Dashboard.findById(id)
    .then(dashboard => dashboard.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;
