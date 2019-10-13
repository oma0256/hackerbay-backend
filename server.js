const express = require('express');
const log = require('fancy-log');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');

const app = express();

app.use(bodyParser.json());

app.use('/login', loginRoute);

app.use((error, req, res, next) =>
  res
    .status(error.statusCode || 500)
    .json({ message: error.message, errors: error.data })
);

const server = app.listen(8000, () => log('Server running on port 8000'));

module.exports = server;
