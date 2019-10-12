const express = require('express');
const loginContoller = require('../controllers/login');

const router = express.Router();

router.post('', loginContoller.login);

module.exports = router;
