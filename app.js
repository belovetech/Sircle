/* eslint-disable import/no-extraneous-dependencies */
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const roomRouter = require('./routes/roomRouter');

// APP
const app = express();

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};
app.use(cors(corOptions));

// Development logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/rooms', roomRouter);

app.use('*', (req, res, next) =>
  res.status(404).json({ Error: 'This route was not defined on this server' })
);

module.exports = app;
