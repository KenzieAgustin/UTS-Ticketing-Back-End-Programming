const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const transactionRoute = require('./components/transaction/transaction-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  transactionRoute(app);

  return app;
};
