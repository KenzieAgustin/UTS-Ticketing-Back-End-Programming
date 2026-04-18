const express = require('express');

const authController = require('./auth-controller');
const { authMiddleware } = require('../../middlewares');

const route = express.Router();

module.exports = (app) => {
  app.use('/auth', route);

  // register role selalu user kalo mau ganti ke admin ganti di database
  route.post('/register', authController.register);

  // login dan dapat JWT token
  route.post('/login', authController.login);

  route.get('/protected', authMiddleware, authController.testProtected);
};
