const express = require('express');
const jsonPatchController = require('../controllers/json-patch');
const jsonPatchValidators = require('../validators/json-patch');
const { checkUserIsAuthenticated } = require('../utils/jwt');

const router = express.Router();

router.post(
  '',
  checkUserIsAuthenticated,
  jsonPatchValidators.jsonPatch,
  jsonPatchController.jsonPatch
);

module.exports = router;
