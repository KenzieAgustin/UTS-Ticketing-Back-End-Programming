const bookingService = require('./booking-service');

async function createBooking(request, response, next) {
  try {
    const { userId, movieName, seatNumber, price } = request.body;
    const booking = await bookingService.createBooking(
      userId,
      movieName,
      seatNumber,
      price
    );

    return response.status(201).json(booking);
  } catch (error) {
    return next(error);
  }
}

async function getBooking(request, response, next) {
  try {
    const booking = await bookingService.getBooking(request.params.id);
    return response.status(200).json(booking);
  } catch (error) {
    return next(error);
  }
}

async function getMyTicket(request, response, next) {
  try {
    const { userId } = request.query;
    const ticket = await bookingService.getMyTicket(userId);
    return response.status(200).json(ticket);
  } catch (error) {
    return next(error);
  }
}

async function applyPromo(request, response, next) {
  try {
    const { bookingId, promoCode } = request.body;
    const result = await bookingService.applyPromo(bookingId, promoCode);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function lockSeats(request, response, next) {
  try {
    const { userId, movieName, seatNumber } = request.body;
    const result = await bookingService.lockSeats(
      userId,
      movieName,
      seatNumber
    );
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function unlockSeats(request, response, next) {
  try {
    const { movieName, seatNumber } = request.body;
    const result = await bookingService.unlockSeats(movieName, seatNumber);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createBooking,
  getBooking,
  getMyTicket,
  applyPromo,
  lockSeats,
  unlockSeats,
};
