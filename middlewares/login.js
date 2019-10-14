const { body } = require('express-validator');
const messages = require('../messages/middlewares/login');

exports.loginValidators = [
  body('username')
    .exists()
    .withMessage(messages.requiredUsername)
    .trim()
    .isAlphanumeric()
    .withMessage(messages.invalidUsername)
    .isLength({ min: 3 })
    .withMessage(messages.shortUsername),
  body('password')
    .exists()
    .withMessage(messages.requiredPassword)
    .trim()
    .isLength({ min: 3 })
    .withMessage(messages.invalidPassword),
];
