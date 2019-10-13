const download = require('image-downloader');
const path = require('path');
const sharp = require('sharp');

exports.createThumbnail = async (req, res, next) => {
  const {
    body: { imageUrl },
  } = req;
  const imagePath = path.join('images', 'original-images');
  const thumbnailPath = path.join('images', 'thumbnails');
  const options = {
    url: imageUrl,
    dest: imagePath,
  };
  try {
    const { filename } = await download.image(options);
    const imageFileName = filename.split('/')[2];
    const thumbnailFileName = path.join(thumbnailPath, imageFileName);
    await sharp(filename)
      .resize(50, 50)
      .toFile(thumbnailFileName);
    return res.status(201).json({
      message: 'Thumbnail created successfully',
      thumbnail: thumbnailFileName,
    });
  } catch (error) {
    next(error);
  }
};
