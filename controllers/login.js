const { validationResult } = require('express-validator');
const { generateToken } = require('../utils/jwt');
const { userLoggedIn } = require('../messages/controllers/login');
const { invalidInputs } = require('../messages');

exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(invalidInputs);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { username } = req.body;
  const payload = { username };
  const token = generateToken(payload);
  return res.status(200).json({ message: userLoggedIn, token, username });
};
