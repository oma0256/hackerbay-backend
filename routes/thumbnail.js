const express = require('express');
const thumbnailController = require('../controllers/thumbnail');
const { thumbnailValidators } = require('../validators/thumbnail');

const router = express.Router();

router.post('', thumbnailValidators, thumbnailController.createThumbnail);

module.exports = router;
