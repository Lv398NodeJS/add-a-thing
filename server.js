const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dashboards = require('./routes/dashboards');
const tasks = require('./routes/tasks');
const subtasks = require('./routes/subtasks');
const configureSocket = require('./socket');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.log(err));

app.use('/dashboards', dashboards);
app.use('/dashboards/dashboard', tasks);
app.use('/subtasks', subtasks)

const port = process.env.PORT || 6000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));
configureSocket(server);
