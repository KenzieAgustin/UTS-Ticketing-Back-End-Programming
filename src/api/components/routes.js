const express = require('express');

const users = require('./users/users-route');
const movie = require('./movies/movie-routes');
const beverage = require('./beverage/beverage-routes');
const theathers = require('./theathers/theathers-route'); // Cek pathnya!
const showtimes = require('./showtimes/showtimes-route');

module.exports = () => {
  const app = express.Router();

  theathers(app);
  showtimes(app);
  beverage(app);
  movie(app);
  users(app);

  return app;
};
