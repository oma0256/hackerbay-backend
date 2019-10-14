const { generateToken } = require('../utils/jwt');
const { userLoggedIn } = require('../messages/controllers/login');
const { errorHandler } = require('../utils/error-handler');

/**
 * Login a user
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} An object with a message, token and username
 */
exports.login = (req, res) => {
  errorHandler(req);
  const {
    body: { username },
  } = req;
  const payload = { username };
  const token = generateToken(payload);
  return res.status(200).json({ message: userLoggedIn, token, username });
};
