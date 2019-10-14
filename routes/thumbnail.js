const express = require('express');
const thumbnailController = require('../controllers/thumbnail');
const { thumbnailValidators } = require('../validators/thumbnail');
const { checkUserIsAuthenticated } = require('../utils/jwt');

const router = express.Router();

router.post(
  '',
  checkUserIsAuthenticated,
  thumbnailValidators,
  thumbnailController.createThumbnail
);

module.exports = router;
