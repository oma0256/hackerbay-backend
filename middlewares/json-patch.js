const { body } = require('express-validator');
const messages = require('../messages/middlewares/json-patch');

exports.jsonPatchValidators = [
  body('document')
    .exists()
    .withMessage(messages.requiredDocument),
  body('patch')
    .exists()
    .withMessage(messages.requiredPatch)
    .isArray({ min: 1 })
    .withMessage(messages.invalidPatch),
];
