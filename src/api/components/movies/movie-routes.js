const express = require('express');

const router = express.Router();
const movieController = require('./movie-controller');
const { authMiddleware, adminMiddleware } = require('../../middlewares');

module.exports = (app) => {
  app.use('/movies', router);

  // Public
  router.get('/', movieController.getAll);
  router.get('/:id', movieController.getOne);

  // Admin only
  router.post('/', authMiddleware, adminMiddleware, movieController.create);
  router.put('/:id', authMiddleware, adminMiddleware, movieController.update);
  router.patch(
    '/:id',
    authMiddleware,
    adminMiddleware,
    movieController.partialUpdate
  );
  router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    movieController.remove
  );
};
