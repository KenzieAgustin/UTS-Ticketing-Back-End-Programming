const express = require('express');

const router = express.Router();
const beverageController = require('./beverage-controller');
const { authMiddleware, adminMiddleware } = require('../../middlewares');

module.exports = (app) => {
  app.use('/beverages', router);

  // Public
  router.get('/', beverageController.getAll);

  // Admin only
  router.post('/', authMiddleware, adminMiddleware, beverageController.create);
  router.patch(
    '/:id',
    authMiddleware,
    adminMiddleware,
    beverageController.update
  );
  router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    beverageController.remove
  );
};
