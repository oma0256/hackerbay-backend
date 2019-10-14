const download = require('image-downloader');
const path = require('path');
const jimp = require('jimp');
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
    const imagePath = path.join('images', 'thumbnails');
    const options = {
      url: imageUrl,
      dest: imagePath,
    };
    const { filename } = await download.image(options); // download image from the url
    const image = await jimp.read(filename); // resize the image and save it
    await image.resize(50, 50).writeAsync(filename);
    return res.status(201).json({
      message: messages.thumbnailCreated,
      thumbnail: filename,
    });
  } catch (error) {
    next(error);
  }
};
