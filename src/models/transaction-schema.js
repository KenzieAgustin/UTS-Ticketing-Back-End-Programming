module.exports = (mongoose) => {
  const schema = new mongoose.Schema({
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'booking',
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['Dana', 'GoPay', 'OVO', 'QRIS'],
      default: 'Dana',
    },
    paidAt: {
      type: Date,
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('transaction', schema);
};
