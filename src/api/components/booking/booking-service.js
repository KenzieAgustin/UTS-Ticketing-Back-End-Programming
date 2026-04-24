/* eslint-disable no-underscore-dangle */
const bookingRepository = require('./booking-repository');

async function createBooking(userId, movieName, seatNumber, price) {
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

  // eslint-disable-next-line no-shadow
  return ticket.map((ticket) => ({
    bookingId: ticket._id,
    event: ticket.movieName,
    seat: ticket.seatNumber,
    date: ticket.bookingDate,
  }));
}
async function applyPromo(bookingId, promoCode) {
  const booking = await bookingRepository.getBooking(bookingId);
  if (!booking) {
    throw new Error('Booking tidak ditemukan');
  }

  let discount = 0;
  if (promoCode === 'PROMO10K') {
    discount = 10000;
  } else {
    throw new Error('Kode promo tidak valid');
  }

  const newPrice = Math.max(0, booking.price - discount);
  const updatedBooking = await bookingRepository.updateBookingPrice(
    bookingId,
    newPrice
  );

  return {
    success: true,
    message: 'Promo berhasil diaplikasikan',
    originalPrice: booking.price,
    newPrice: updatedBooking.price,
  };
}

async function lockSeats(userId, movieName, seatNumber) {
  const lockedSeat = await bookingRepository.lockSeat(
    userId,
    movieName,
    seatNumber
  );

  return {
    success: true,
    message: `Kursi ${seatNumber} untuk film ${movieName} berhasil dikunci sementara`,
    data: lockedSeat,
  };
}

async function unlockSeats(movieName, seatNumber) {
  const unlocked = await bookingRepository.unlockSeat(movieName, seatNumber);

  if (unlocked.deletedCount === 0) {
    throw new Error('Gagal membuka kursi, mungkin kursi tidak sedang dikunci');
  }

  return {
    success: true,
    message: `Kursi ${seatNumber} berhasil dibuka kembali`,
  };
}

module.exports = {
  createBooking,
  getBooking,
  getMyTicket,
  applyPromo,
  lockSeats,
  unlockSeats,
};
