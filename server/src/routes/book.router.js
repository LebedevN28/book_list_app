const bookController = require('../controllers/book.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const bookRouter = require('express').Router();
const fs = require('fs').promises;
const sharp = require('sharp');
const upload = require('../middlewares/multer');

bookRouter
  .route('/')
  .get(bookController.getAll)
  .post(verifyAccessToken, upload.single('file'), bookController.create);

bookRouter
  .route('/:id')
  .get(verifyAccessToken, bookController.getById)
  .put(verifyAccessToken, upload.single('file'), bookController.updateOne)
  .delete(verifyAccessToken, bookController.delete);

module.exports = bookRouter;
