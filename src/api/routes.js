const express = require('express');

const auth = require('./components/auth/auth-route');
const users = require('./components/users/users-route');
const movie = require('./components/movies/movie-routes');
const beverage = require('./components/beverage/beverage-routes');
const booking = require('./components/booking/booking-route');
const product = require('./components/product/product-route');
const theathers = require('./components/theathers/theathers-route');
const showtimes = require('./components/showtimes/showtimes-route');
const transaction = require('./components/transaction/transaction-route');

module.exports = () => {
  const app = express.Router();

  auth(app);
  users(app);
  theathers(app);
  showtimes(app);
  beverage(app);
  movie(app);
  booking(app);
  product(app);
  transaction(app);

  return app;
};
