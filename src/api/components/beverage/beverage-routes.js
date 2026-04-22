const express = require('express');
const beverageController = require('./beverage-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/beverages', route);

  // Get all beverages (supports ?category=&isAvailable=)
  route.get('/', beverageController.getAll);

  // Create beverage (Admin)
  route.post('/', beverageController.create);

  // Update beverage (Admin)
  route.patch('/:id', beverageController.update);

  // Delete beverage (Admin)
  route.delete('/:id', beverageController.remove);
};