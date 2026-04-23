const theathersController = require('./theathers-controller');

module.exports = (app) => {
  const route = require('express').Router();
  app.use('/theathers', route);

  route.get('/', theathersController.getTheathers);
  route.get('/:id', theathersController.getTheatherById);
  route.post('/', theathersController.createTheather);

  // Baris baru untuk delete
  route.delete('/:id', theathersController.deleteTheather);
};
