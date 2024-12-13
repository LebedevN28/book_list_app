const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bookRouter = require('./routes/book.router');
const authRouter = require('./routes/auth.router');
const tokensRouter = require('./routes/tokensRouter');
const app = express();
app.use(express.static('public'));

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/api/books', bookRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);

module.exports = app;
