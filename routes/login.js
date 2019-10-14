const express = require('express');
const loginContoller = require('../controllers/login');
const { loginValidators } = require('../middlewares/login');

const router = express.Router();

router.post('', loginValidators, loginContoller.login);

module.exports = router;
