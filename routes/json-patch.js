const express = require('express');
const jsonPatchController = require('../controllers/json-patch');
const { jsonPatchValidators } = require('../middlewares/json-patch');
const { checkUserIsAuthenticated } = require('../middlewares/jwt');

const router = express.Router();

router.post(
  '',
  checkUserIsAuthenticated,
  jsonPatchValidators,
  jsonPatchController.jsonPatch
);

module.exports = router;
