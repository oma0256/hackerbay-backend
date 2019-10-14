const jsonpatch = require('json-patch');
const messages = require('../messages/controllers/json-patch');
const { errorHandler } = require('../utils/error-handler');

exports.jsonPatch = (req, res) => {
  errorHandler(req);
  const {
    body: { document, patch },
  } = req;
  const doc = JSON.parse(document);
  jsonpatch.apply(doc, JSON.parse(patch));
  return res
    .status(200)
    .json({ message: messages.documentPatched, document: doc });
};
