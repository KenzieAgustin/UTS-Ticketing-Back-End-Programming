const express = require('express');

const movie = require('./movies/movie-routes');
const beverage = require('./beverage/beverage-routes');
const booking = require('./booking/booking-route');
const books = require('./books/books-route');
const product = require('./product/product-route');

module.exports = () => {
  const app = express.Router();

  beverage(app);
  movie(app);
  books(app);
  booking(app);
  product(app);

  return app;
};
