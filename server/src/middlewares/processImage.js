const sharp = require('sharp');
const fs = require('fs').promises;

async function processImage(req, res, next) {
  if (!req.file) {
    return res.status(400).json({ message: 'Cover image is required' });
  }

  try {
    const fileName = `${Date.now()}.webp`;
    const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();

    const outputPath = `./public/covers/${fileName}`;
    await fs.writeFile(outputPath, outputBuffer);

    req.processedImageName = fileName; 
    next();
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'Error processing image', details: error.message });
  }
}

module.exports = processImage;
