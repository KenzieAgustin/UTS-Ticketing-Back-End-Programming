const express = require('express');
const bookingController = require('./booking-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/booking', route);

  route.post('/', bookingController.createBooking);
  route.get('/my-ticket', bookingController.getMyTicket);
  route.get('/:id', bookingController.getBooking);
};
