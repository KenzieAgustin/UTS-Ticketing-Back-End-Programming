const express = require('express');
const transactionController = require('./transaction-controller');

// Middleware contoh untuk admin & staff guard
// Ganti dengan middleware auth kalian yang sebenarnya
const adminGuard = (req, res, next) => {
  // TODO: Ganti dengan validasi role dari JWT / session
  // Contoh: if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  next();
};

const staffGuard = (req, res, next) => {
  // TODO: Ganti dengan validasi role dari JWT / session
  // Contoh: if (req.user?.role !== 'staff') return res.status(403).json({ message: 'Forbidden' });
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
