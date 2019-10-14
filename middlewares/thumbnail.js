const { body } = require('express-validator');
const messages = require('../messages/validators/thumbnail');

exports.thumbnailValidators = [
  body('imageUrl')
    .exists()
    .withMessage(messages.requiredImageUrl)
    .trim()
    .isURL()
    .withMessage(messages.invalidImageUrl)
    .custom(imageUrl => {
      if (!imageUrl.match(/\.jpg|\.jpeg|\.png|\.webp/)) {
        throw new Error(messages.invalidImageType);
      }
      return true;
    }),
];
