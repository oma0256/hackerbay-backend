const messages = require('../messages/utils/jwt');
const { decodeToken } = require('../utils/jwt');

/**
 * Checks if a token has been provided when making a request
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {method} next Method used to call the next middleware
 */
exports.checkUserIsAuthenticated = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error(messages.requiredAuthHeaders);
    error.statusCode = 401;
    throw error;
  }
  const splitAuthHeader = authHeader.split(' ');
  if (splitAuthHeader.length !== 2 || splitAuthHeader[0] !== 'Bearer') {
    const error = new Error(messages.invalidAuthHeaders);
    error.statusCode = 401;
    throw error;
  }
  const token = splitAuthHeader[1];
  const { username } = decodeToken(token);
  req.username = username;
  next();
};
