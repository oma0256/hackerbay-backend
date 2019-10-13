const jsonpatch = require('json-patch');
const messages = require('../messages/controllers/json-patch');

exports.jsonPatch = (req, res) => {
  const {
    body: { document, patch },
  } = req;
  const result = jsonpatch.apply(document, patch);
  return res
    .status(200)
    .json({ message: messages.documentPatched, document: result });
};
