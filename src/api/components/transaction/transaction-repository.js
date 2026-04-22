const { transaction, booking, ticket } = require('../../../models');

async function findTransactionByBookingId(bookingId) {
  return transaction.findOne({ bookingId });
}

async function createTransaction(bookingId, userId, amount, paymentMethod) {
  return transaction.create({ bookingId, userId, amount, paymentMethod });
}

async function updateTransactionStatus(bookingId, status, extraFields = {}) {
  return transaction.findOneAndUpdate(
    { bookingId },
    { status, ...extraFields },
    { new: true }
  );
}

async function getAllTransactions(filter = {}) {
  return transaction
    .find(filter)
    .populate('bookingId', 'movieName seatNumber bookingDate')
    .populate('userId', 'email')
    .sort({ createdAt: -1 });
}

async function findBookingById(id) {
  return booking.findById(id);
}

async function findTicketByBookingId(bookingId) {
  return ticket.findOne({ bookingId }).populate('bookingId');
}

async function createTicket(bookingId, userId) {
  return ticket.create({ bookingId, userId });
}

async function markTicketAsUsed(bookingId, verifiedBy) {
  return ticket.findOneAndUpdate(
    { bookingId },
    { isUsed: true, usedAt: new Date(), verifiedBy },
    { new: true }
  );
}

module.exports = {
  findTransactionByBookingId,
  createTransaction,
  updateTransactionStatus,
  getAllTransactions,
  findBookingById,
  findTicketByBookingId,
  createTicket,
  markTicketAsUsed,
};
