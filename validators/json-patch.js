const { body } = require('express-validator');
const messages = require('../messages/validators/json-patch');

exports.jsonPatch = [
  body('document')
    .exists()
    .withMessage(messages.requiredDocument)
    .trim()
    .not()
    .isEmpty()
    .withMessage(messages.requiredDocument),
  body('patch')
    .exists()
    .withMessage(messages.requiredPatch)
    .trim()
    .not()
    .isEmpty()
    .withMessage(messages.requiredPatch)
    .custom(patch => {
      const patchArray = JSON.parse(patch);
      if (
        (Array.isArray(patchArray) && patchArray.length < 1) ||
        !Array.isArray(patchArray)
      ) {
        throw new Error(messages.invalidPatch);
      }
      return true;
    }),
];
