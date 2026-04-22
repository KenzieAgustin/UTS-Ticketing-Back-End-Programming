const showtimesController = require('./showtimes-controller');

module.exports = (app) => {
  const route = require('express').Router();
  app.use('/showtimes', route);

  route.get('/', showtimesController.getShowtimes);
  route.post('/', showtimesController.createShowtime);
  route.delete('/:id', showtimesController.deleteShowtime);
};