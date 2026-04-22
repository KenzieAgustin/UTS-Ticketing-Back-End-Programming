const express = require('express');

const usersController = require('./users-controller');
const { authMiddleware, adminMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // user
  route.get('/me', authMiddleware, usersController.getMe);
  route.put('/me', authMiddleware, usersController.updateMe);
  route.put(
    '/me/change-password',
    authMiddleware,
    usersController.changeMyPassword
  );

  // admin
  route.get('/', authMiddleware, adminMiddleware, usersController.getUsers);
  route.post('/', authMiddleware, adminMiddleware, usersController.createUser);
  route.get('/:id', authMiddleware, adminMiddleware, usersController.getUser);
  route.put(
    '/:id',
    authMiddleware,
    adminMiddleware,
    usersController.updateUser
  );
  route.put(
    '/:id/change-password',
    authMiddleware,
    adminMiddleware,
    usersController.changePassword
  );
  route.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    usersController.deleteUser
  );
};
