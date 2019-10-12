const jwt = require('jsonwebtoken');

const secreteKey = 'somesupersecretkey';

exports.generateToken = payload =>
  jwt.sign(payload, secreteKey, { expiresIn: '1h' });
