const models = require('../../db/models');

class BookService {
  #db;

  constructor(db) {
    this.#db = db;
  }

  getAll() {
    return this.#db.Book.findAll();
  }
  getById(id) {
    return this.#db.Book.findByPk(id);
  }
  create(book) {
    return this.#db.Book.create(book);
  }
  update(id, book) {
    return this.#db.Book.update(book, { where: { id } });
  }
  delete(id) {
    return this.#db.Book.destroy({ where: { id } });
  }
}

module.exports = new BookService(models);
