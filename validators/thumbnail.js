const { body } = require('express-validator');
const messages = require('../messages/validators/thumbnail');

exports.thumbnailValidators = [
  body('imageUrl')
    .exists()
    .withMessage(messages.requiredImageUrl)
    .trim()
    .not()
    .isEmpty()
    .withMessage(messages.requiredImageUrl)
    .isURL()
    .withMessage(messages.invalidImageUrl)
    .custom(imageUrl => {
      const splitImageUrl = imageUrl.split('.');
      const imageExtension = splitImageUrl[splitImageUrl.length - 1];
      const supportedExtensions = ['jpeg', 'png', 'webp'];
      if (!supportedExtensions.includes(imageExtension)) {
        throw new Error(messages.invalidImageType);
      }
      return true;
    }),
];
