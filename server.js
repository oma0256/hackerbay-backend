const express = require('express');
const log = require('fancy-log');
const bodyParser = require('body-parser');
const loginRoute = require('./routes/login');

const app = express();

app.use(bodyParser.json());

app.use('/login', loginRoute);

app.listen(8000, () => log('Server running on port 8000'));
