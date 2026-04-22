const express = require('express');

const movie = require('./movies/movie-routes');
const beverage = require('./beverage/beverage-routes');
const booking = require('./booking/booking-route');
const books = require('./books/books-route');
const product = require('./product/product-route');
const theathers = require('./theathers/theathers-route'); // Cek pathnya!
const showtimes = require('./showtimes/showtimes-route');

module.exports = () => {
  const app = express.Router();

  theathers(app);
  showtimes(app);
  beverage(app);
  movie(app);
  books(app);
  booking(app);
  product(app);

  return app;
};
