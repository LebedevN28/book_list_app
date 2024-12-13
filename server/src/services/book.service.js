const models = require('../../db/models');

class BookService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  // Получить все книги
  getAll() {
    return this.#db.Book.findAll({
      include: [{ model: this.#db.User }],
    });
  }

  getById(id) {
    return this.#db.Book.findByPk(id);
  }

  create(book) {
    return this.#db.Book.create(book);
  }

  async updateById(id, updatedBook) {
    try {
      const book = await this.#db.Book.findByPk(id);
      if (!book) {
        throw new Error('Book not found');
      }

      const { userId, ...updateData } = updatedBook;

      if (book.userId !== userId) {
        throw new Error('Unauthorized');
      }

      await book.update(updateData); // Обновляем только разрешенные поля
      return book;
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  }

  async delete(id, userId) {
    try {
      const book = await this.#db.Book.findByPk(id);

      if (!book) {
        throw new Error('Book not found');
      }
      if (book.userId !== userId) {
        throw new Error('You are not authorized to delete this book');
      }

      return await this.#db.Book.destroy({ where: { id } });
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

module.exports = new BookService(models);
