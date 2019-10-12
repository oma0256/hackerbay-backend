const { body } = require('express-validator');
const {
  requiredUsername,
  requiredPassword,
} = require('../messages/validators/login');

exports.loginValidators = [
  body('username')
    .exists()
    .withMessage(requiredUsername)
    .trim()
    .not()
    .isEmpty()
    .withMessage(requiredUsername),
  body('password')
    .exists()
    .withMessage(requiredPassword)
    .trim()
    .not()
    .isEmpty()
    .withMessage(requiredPassword),
];
