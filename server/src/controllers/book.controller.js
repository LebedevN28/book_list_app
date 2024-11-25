const bookService = require('../services/book.service');

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
    try {
      const data = req.body;
      const result = await this.#service.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json(error.message);
    }
  };
  update = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const [updatedRows] = await this.#service.update(id, data);
      if (updatedRows === 0) return res.status(404).json({ message: 'Book not found' });
      res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  delete = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRows = await this.#service.delete(id);
      if (deletedRows === 0) return res.status(404).json({ message: 'Book not found' });
      res.status(204).json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new BookController(bookService);
