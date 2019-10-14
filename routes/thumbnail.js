const express = require('express');
const thumbnailController = require('../controllers/thumbnail');
const { thumbnailValidators } = require('../middlewares/thumbnail');
const { checkUserIsAuthenticated } = require('../middlewares/jwt');

const router = express.Router();

router.post(
  '',
  checkUserIsAuthenticated,
  thumbnailValidators,
  thumbnailController.createThumbnail
);

module.exports = router;
