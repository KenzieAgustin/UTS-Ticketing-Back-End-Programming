const bookingRepository = require('./booking-repository');

async function createBooking(userId, movieName, seatNumber, price) {
  try {
    const newBooking = await bookingRepository.createBooking(
      userId,
      movieName,
      seatNumber,
      price
    );

    return {
      id: newBooking._id,
      movieName: newBooking.movieName,
      seatNumber: newBooking.seatNumber,
      status: 'Yayyy Berhasil',
    };
  } catch (error) {
    return error;
  }
}

async function getBooking(id) {
  const booking = await bookingRepository.getBooking(id);
  if (!booking) {
    return null;
  }

  return {
    id: booking._id,
    user: booking.userId,
    movie: booking.movieName,
    seat: booking.seatNumber,
    price: booking.price,
    date: booking.bookingDate,
  };
}

async function getMyTicket(userId) {
  const ticket = await bookingRepository.getMyTicket(userId);

  return ticket.map((ticket) => ({
    bookingId: ticket._id,
    event: ticket.movieName,
    seat: ticket.seatNumber,
    date: ticket.bookingDate,
  }));
}

module.exports = {
  createBooking,
  getBooking,
  getMyTicket,
};
