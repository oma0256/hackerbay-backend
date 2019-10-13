const { validationResult } = require('express-validator');
const { invalidInputs } = require('../messages/index');

exports.errorHandler = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error(invalidInputs);
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};
