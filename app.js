const express = require('express');
const morgan = require('morgan');
const path = require('path');
const appRouter = require('./routes/index');

// APP
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(express.json());

// Development logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', appRouter);

module.exports = app;
