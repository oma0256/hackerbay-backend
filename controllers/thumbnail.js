const download = require('image-downloader');
const path = require('path');
const sharp = require('sharp');
const messages = require('../messages/controllers/thumbnail');
const { errorHandler } = require('../utils/error-handler');

/**
 * Creates a thumbnail based on the public url
 * @param {object} req Request object
 * @param {object} res Response object
 * @param {method} next Method used to call the next middleware
 * @returns {object} An object with a message and thumbnail
 */
exports.createThumbnail = async (req, res, next) => {
  try {
    errorHandler(req);
    const {
      body: { imageUrl },
    } = req;
    const imagePath = path.join('images', 'original-images');
    const thumbnailPath = path.join('images', 'thumbnails');
    const options = {
      url: imageUrl,
      dest: imagePath,
    };
    const { filename } = await download.image(options);
    const imageFileName = filename.split('/')[2];
    const thumbnailFileName = path.join(thumbnailPath, imageFileName);
    await sharp(filename)
      .resize(50, 50)
      .toFile(thumbnailFileName);
    return res.status(201).json({
      message: messages.thumbnailCreated,
      thumbnail: thumbnailFileName,
    });
  } catch (error) {
    next(error);
  }
};
