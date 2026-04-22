const express = require('express');

const auth = require('./components/auth/auth-route');
const movie = require('./components/movies/movie-routes');
const beverage = require('./components/beverage/beverage-routes');
const booking = require('./components/booking/booking-route');
const books = require('./components/books/books-route');
const product = require('./components/product/product-route');
const theathers = require('./components/theathers/theathers-route');
const showtimes = require('./components/showtimes/showtimes-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  theathers(app);
  showtimes(app);
  beverage(app);
  movie(app);
  books(app);
  booking(app);
  product(app);

  return app;
};