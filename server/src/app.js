const express = require('express');
const morgan = require('morgan');
const bookRouter = require('./routes/book.router');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/books', bookRouter);

module.exports = app;
