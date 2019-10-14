const express = require('express');
const loginContoller = require('../controllers/login');
const { loginValidators } = require('../validators/login');
const { checkUserIsAuthenticated } = require('../utils/jwt');

const router = express.Router();

router.post(
  '',
  checkUserIsAuthenticated,
  loginValidators,
  loginContoller.login
);

module.exports = router;
