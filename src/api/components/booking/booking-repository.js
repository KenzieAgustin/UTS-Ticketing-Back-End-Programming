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

async function updateBookingPrice(bookingId, newPrice) {
  return booking.findByIdAndUpdate(
    bookingId,
    { price: newPrice },
    { new: true }
  );
}

async function lockSeat(userId, movieName, seatNumber) {
  return booking.create({
    userId,
    movieName,
    seatNumber,
    price: 0,
    status: 'LOCKED',
  });
}

async function unlockSeat(movieName, seatNumber) {
  return booking.deleteOne({
    movieName,
    seatNumber,
    status: 'LOCKED',
  });
}

module.exports = {
  createBooking,
  getBooking,
  getMyTicket,
  updateBookingPrice,
  lockSeat,
  unlockSeat,
};
