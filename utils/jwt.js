const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const messages = require('../messages/utils/jwt');

dotenv.config();
const secreteKey = process.env.SECRET_KEY;

/**
 * Generates a jwt token
 * @param {object} payload Object encrypted in the token
 * @returns {string} A token
 */
exports.generateToken = payload =>
  jwt.sign(payload, secreteKey, { expiresIn: '1h' });

/**
 * Decryptes a jwt token
 * @param {string} token A token
 * @returns {object} The object used to when generating the token
 */
exports.decodeToken = token => {
  try {
    const payload = jwt.verify(token, secreteKey);
    return payload;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

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
  const { username } = this.decodeToken(token);
  req.username = username;
  next();
};
