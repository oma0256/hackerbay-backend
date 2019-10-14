const express = require('express');
const log = require('fancy-log');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const loginRoute = require('./routes/login');
const thumbnailRoute = require('./routes/thumbnail');
const jsonPatchRoute = require('./routes/json-patch');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.json());
app.use(express.static('images'));

app.use('/login', loginRoute);
app.use('/thumbnail', thumbnailRoute);
app.use('/json-patch', jsonPatchRoute);

app.use('', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) =>
  res
    .status(error.statusCode || 500)
    .json({ message: error.message, errors: error.data })
);

const server = app.listen(8000, () => log('Server running on port 8000'));

module.exports = server;
