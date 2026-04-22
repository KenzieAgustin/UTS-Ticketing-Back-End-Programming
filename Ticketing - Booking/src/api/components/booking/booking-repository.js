const { booking } = require('../../../models');

async function createBooking(userId, movieName, seatNumber, price) {
  return booking.create({
    userId,
    movieName,
    seatNumber,
    price,
  });
}

async function getBooking(id) {
  return booking.findById(id).populate('userId', 'email');
}

async function getMyTicket(userId) {
  return booking.find({ userId });
}

module.exports = {
  createBooking,
  getBooking,
  getMyTicket,
};
