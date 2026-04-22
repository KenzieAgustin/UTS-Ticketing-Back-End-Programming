const express = require('express');

const booking = require('./components/booking/booking-route');
const books = require('./components/books/books-route');
const users = require('./components/users/users-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  booking(app);

  return app;
};
