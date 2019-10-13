const express = require('express');
const jsonPatchController = require('../controllers/json-patch');

const router = express.Router();

router.post('', jsonPatchController.jsonPatch);

module.exports = router;
