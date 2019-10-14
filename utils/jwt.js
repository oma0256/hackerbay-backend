const jwt = require('jsonwebtoken');
const messages = require('../messages/utils/jwt');

const secreteKey = 'somesupersecretkey';

exports.generateToken = payload =>
  jwt.sign(payload, secreteKey, { expiresIn: '1h' });

exports.decodeToken = token => {
  try {
    const payload = jwt.verify(token, secreteKey);
    return payload;
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

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
  const token = authHeader.split(' ')[1];
  const { username } = this.decodeToken(token);
  req.username = username;
  next();
};
