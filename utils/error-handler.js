const { validationResult } = require('express-validator');
const { invalidInputs } = require('../messages/index');

/**
 * Checks if invalid data is passed when making a request
 * @param {object} req Request object
 * @returns Throws an error if invalid data was passed during a request
 */
exports.errorHandler = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(invalidInputs);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};
