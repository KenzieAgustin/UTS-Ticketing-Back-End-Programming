const transactionService = require('./transaction-service');

// POST /api/bookings/:id/pay
async function payBooking(request, response, next) {
  try {
    const { id } = request.params;
    const { paymentMethod } = request.body;
    const result = await transactionService.payBooking(id, paymentMethod);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// PATCH /api/bookings/:id/cancel
async function cancelBooking(request, response, next) {
  try {
    const { id } = request.params;
    const result = await transactionService.cancelBooking(id);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// GET /api/admin/transactions  (Admin only)
async function getAllTransactions(request, response, next) {
  try {
    const { status } = request.query; // ?status=paid | cancelled | pending
    const result = await transactionService.getAllTransactions(status);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

// POST /api/tickets/verify  (Staff only)
async function verifyTicket(request, response, next) {
  try {
    const { bookingId, verifiedBy } = request.body;
    const result = await transactionService.verifyTicket(bookingId, verifiedBy);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  payBooking,
  cancelBooking,
  getAllTransactions,
  verifyTicket,
};
