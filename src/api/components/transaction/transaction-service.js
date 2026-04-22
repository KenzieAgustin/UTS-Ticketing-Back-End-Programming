const transactionRepository = require('./transaction-repository');

// ── POST /api/bookings/:id/pay ────────────────────────────────
async function payBooking(bookingId, paymentMethod) {
  const existingBooking =
    await transactionRepository.findBookingById(bookingId);
  if (!existingBooking) {
    const err = new Error('Booking tidak ditemukan');
    err.status = 404;
    throw err;
  }

  const existingTrx =
    await transactionRepository.findTransactionByBookingId(bookingId);

  if (existingTrx) {
    if (existingTrx.status === 'paid') {
      const err = new Error('Booking ini sudah dibayar');
      err.status = 400;
      throw err;
    }
    if (existingTrx.status === 'cancelled') {
      const err = new Error('Booking ini sudah dibatalkan, tidak bisa dibayar');
      err.status = 400;
      throw err;
    }
  }

  if (!existingTrx) {
    await transactionRepository.createTransaction(
      bookingId,
      existingBooking.userId,
      existingBooking.price,
      paymentMethod || 'Dana'
    );
  }

  const paid = await transactionRepository.updateTransactionStatus(
    bookingId,
    'paid',
    { paidAt: new Date(), paymentMethod: paymentMethod || 'Dana' }
  );

  // Buat tiket otomatis setelah bayar
  const existingTicket =
    await transactionRepository.findTicketByBookingId(bookingId);
  if (!existingTicket) {
    await transactionRepository.createTicket(bookingId, existingBooking.userId);
  }

  return {
    message: 'Pembayaran berhasil!',
    transactionId: paid.id,
    bookingId: paid.bookingId,
    amount: paid.amount,
    status: paid.status,
    paymentMethod: paid.paymentMethod,
    paidAt: paid.paidAt,
  };
}

// ── PATCH /api/bookings/:id/cancel ───────────────────────────
async function cancelBooking(bookingId) {
  const existingBooking =
    await transactionRepository.findBookingById(bookingId);
  if (!existingBooking) {
    const err = new Error('Booking tidak ditemukan');
    err.status = 404;
    throw err;
  }

  const existingTrx =
    await transactionRepository.findTransactionByBookingId(bookingId);

  if (existingTrx) {
    if (existingTrx.status === 'paid') {
      const err = new Error('Booking yang sudah dibayar tidak bisa dibatalkan');
      err.status = 400;
      throw err;
    }
    if (existingTrx.status === 'cancelled') {
      const err = new Error('Booking ini sudah dibatalkan sebelumnya');
      err.status = 400;
      throw err;
    }
  }

  if (!existingTrx) {
    await transactionRepository.createTransaction(
      bookingId,
      existingBooking.userId,
      existingBooking.price,
      'Dana'
    );
  }

  const cancelled = await transactionRepository.updateTransactionStatus(
    bookingId,
    'cancelled',
    { cancelledAt: new Date() }
  );

  return {
    message: 'Booking berhasil dibatalkan',
    transactionId: cancelled.id,
    bookingId: cancelled.bookingId,
    status: cancelled.status,
    cancelledAt: cancelled.cancelledAt,
  };
}

// ── GET /api/admin/transactions ───────────────────────────────
async function getAllTransactions(statusFilter) {
  const filter = {};
  if (statusFilter) filter.status = statusFilter;

  const transactions = await transactionRepository.getAllTransactions(filter);

  return transactions.map((trx) => ({
    transactionId: trx.id,
    booking: trx.bookingId
      ? {
          bookingId: trx.bookingId.id,
          movie: trx.bookingId.movieName,
          seat: trx.bookingId.seatNumber,
          bookingDate: trx.bookingId.bookingDate,
        }
      : null,
    user: trx.userId
      ? { userId: trx.userId.id, email: trx.userId.email }
      : null,
    amount: trx.amount,
    paymentMethod: trx.paymentMethod,
    status: trx.status,
    paidAt: trx.paidAt,
    cancelledAt: trx.cancelledAt,
    createdAt: trx.createdAt,
  }));
}

// ── POST /api/tickets/verify ──────────────────────────────────
async function verifyTicket(bookingId, verifiedBy) {
  const existingTrx =
    await transactionRepository.findTransactionByBookingId(bookingId);

  if (!existingTrx || existingTrx.status !== 'paid') {
    const err = new Error('Tiket tidak valid atau belum dibayar');
    err.status = 400;
    throw err;
  }

  const existingTicket =
    await transactionRepository.findTicketByBookingId(bookingId);
  if (!existingTicket) {
    const err = new Error('Tiket tidak ditemukan');
    err.status = 404;
    throw err;
  }

  if (existingTicket.isUsed) {
    const err = new Error('Tiket sudah digunakan sebelumnya');
    err.status = 400;
    throw err;
  }

  const updatedTicket = await transactionRepository.markTicketAsUsed(
    bookingId,
    verifiedBy
  );

  return {
    message: 'Check-in berhasil! Selamat menikmati filmnya!',
    bookingId,
    isUsed: updatedTicket.isUsed,
    usedAt: updatedTicket.usedAt,
    verifiedBy: updatedTicket.verifiedBy,
  };
}

module.exports = {
  payBooking,
  cancelBooking,
  getAllTransactions,
  verifyTicket,
};
