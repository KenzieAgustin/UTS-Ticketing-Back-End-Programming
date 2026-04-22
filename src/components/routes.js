const express = require('express');

const users = require('./users/users-route');
const movie = require('./movies/movie-routes');
const beverage = require('./beverage/beverage-routes');

module.exports = () => {
  const app = express.Router();

  beverage(app);
  movie(app);
  users(app);

  return app;
};
