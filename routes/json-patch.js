const express = require('express');
const jsonPatchController = require('../controllers/json-patch');
const jsonPatchValidators = require('../validators/json-patch');

const router = express.Router();

router.post('', jsonPatchValidators.jsonPatch, jsonPatchController.jsonPatch);

module.exports = router;
