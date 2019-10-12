const express = require('express');
const log = require('fancy-log');

const app = express();

app.listen(8000, () => log('Server running on port 8000'));
