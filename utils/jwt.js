const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
