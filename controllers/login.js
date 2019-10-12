const { generateToken } = require('../utils/jwt');
const messages = require('../messages/controllers/login');

exports.login = (req, res) => {
  const { username } = req.body;
  const payload = { username };
  const token = generateToken(payload);
  return res
    .status(200)
    .json({ message: messages.userLoggedIn, token, username });
};
