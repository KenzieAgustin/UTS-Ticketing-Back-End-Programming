const express = require('express');
const bookingController = require('./booking-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/booking', route);

  route.post('/', bookingController.createBooking);
  route.get('/my-ticket', bookingController.getMyTicket);

  route.post('/apply-promo', bookingController.applyPromo);
  route.post('/lock-seats', bookingController.lockSeats);
  route.delete('/unlock-seats', bookingController.unlockSeats);

  route.get('/:id', bookingController.getBooking);
};
