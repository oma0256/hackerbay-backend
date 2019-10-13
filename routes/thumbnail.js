const express = require('express');
const thumbnailController = require('../controllers/thumbnail');

const router = express.Router();

router.post('', thumbnailController.createThumbnail);

module.exports = router;
