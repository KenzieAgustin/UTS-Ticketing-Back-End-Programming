const express = require('express');
const movieController = require('./movie-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/movies', route);

  // Get all movies (supports ?genre=&status=)
  route.get('/', movieController.getAll);

  // Get single movie detail
  route.get('/:id', movieController.getOne);

  // Create movie (Admin)
  route.post('/', movieController.create);

  // Update movie info/poster (Admin)
  route.put('/:id', movieController.update);
  route.patch('/:id', movieController.update);

  // Delete movie (Admin)
  route.delete('/:id', movieController.remove);
};
