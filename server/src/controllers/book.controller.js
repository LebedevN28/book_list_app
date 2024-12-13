const bookService = require('../services/book.service');
const sharp = require('sharp');
const fs = require('fs').promises;

class BookController {
  #service;

  constructor(service) {
    this.#service = service;
  }
  getAll = async (req, res) => {
    try {
      const result = await this.#service.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const book = await this.#service.getById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
  create = async (req, res) => {
    console.log('Полученные данные:', req.body);
    console.log('Полученный файл:', req.file);
    const { title, description, status, author } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Cover image is required' });
    }
    try {
      const name = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();

      await fs.writeFile(`./public/covers/${name}`, outputBuffer);

      if (!title || !author) {
        return res.status(400).json({ message: 'Title and author are required' });
      }

      const userId = res.locals.user?.id;
      if (!userId) {
        return res.status(403).json({ message: 'User not authorized' });
      }

      console.log('Создание книги с данными:', {
        title,
        description,
        status,
        coverImage: name,
        author,
        userId,
      });

      // Создаём книгу в БД
      const result = await this.#service.create({
        title,
        description,
        status,
        coverImage: name,
        author,
        userId,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Ошибка при создании книги:', error);
      res.status(500).json({ message: 'Error creating book', details: error.message });
    }
  };

  updateOne = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, status, author } = req.body;
      const userId = res.locals.user?.id;

      const book = await this.#service.getById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      if (book.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      let coverImage = book.coverImage;

      if (req.file) {
        const fileName = `${Date.now()}.webp`;
        const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
        await fs.writeFile(`./public/covers/${fileName}`, outputBuffer);

        if (coverImage) {
          await fs.unlink(`./public/covers/${coverImage}`).catch((err) => {
            console.warn('Не удалось удалить старую обложку:', err.message);
          });
        }
        coverImage = fileName;
      }

      const updatedBook = await this.#service.updateById(id, {
        title,
        description,
        status,
        author,
        coverImage,
        userId,
      });

      res.status(200).json(updatedBook);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Error updating book', details: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const { id } = req.params; // Получаем ID из параметров запроса
      const userId = res.locals.user?.id; // Получаем ID пользователя из локальных данных

      // Пытаемся найти книгу в базе данных по ID
      const book = await this.#service.getById(id);

      // Если книга не найдена, возвращаем ошибку 404
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Проверяем, что текущий пользователь является автором книги
      if (book.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized' });
      }

      // Если всё в порядке, удаляем книгу
      await this.#service.delete(id, userId);

      // Возвращаем успешный ответ (книга удалена)
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ message: 'Error deleting book', details: error.message });
    }
  };
}

module.exports = new BookController(bookService);
