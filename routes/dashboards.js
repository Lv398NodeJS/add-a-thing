const express = require('express');
const router = express.Router();

const Dashboard = require('../models/Dashboard');

// @route GET /
// @desc fetch all dashboards
router.get('/', (req, res) => {
  Dashboard.find({user: req.params.user})
    .sort({ date: -1 })
    .then(dashboards => res.json(dashboards));
});

// @route POST /
// @desc Post a dashboard
router.post('/', (req, res) => {
  const { name, description, user } = req.body;
  const newDashboard = new Dashboard({
    name,
    description,
    user,
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
