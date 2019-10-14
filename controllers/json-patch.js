const jsonpatch = require('fast-json-patch');
const messages = require('../messages/controllers/json-patch');
const { errorHandler } = require('../utils/error-handler');

/**
 * Updates a document depending on the patch
 * @param {object} req Request object
 * @param {object} res Response object
 * @returns {object} An object with a message and patched document
 */
exports.jsonPatch = (req, res) => {
  errorHandler(req);
  const {
    body: { document, patch },
  } = req;
  const patchedDocument = jsonpatch.applyPatch(document, patch).newDocument;
  return res
    .status(200)
    .json({ message: messages.documentPatched, document: patchedDocument });
};
