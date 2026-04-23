const express = require('express');
const transactionController = require('./transaction-controller');

const adminGuard = (req, res, next) => {
  next();
};

const staffGuard = (req, res, next) => {
  next();
};

module.exports = (app) => {
  const bookingRoute = express.Router();
  const adminRoute = express.Router();
  const ticketRoute = express.Router();

  app.use('/booking', bookingRoute);
  bookingRoute.post('/:id/pay', transactionController.payBooking);
  bookingRoute.patch('/:id/cancel', transactionController.cancelBooking);

  // Endpoint admin
  app.use('/admin', adminRoute);
  adminRoute.get(
    '/transactions',
    adminGuard,
    transactionController.getAllTransactions
  );

  // Endpoint tiket
  app.use('/tickets', ticketRoute);
  ticketRoute.post('/verify', staffGuard, transactionController.verifyTicket);
};
