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
      ref: 'users',
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
      default: null,
    },
    verifiedBy: {
      type: String, // staff name or ID yang scan
      default: null,
    },
  });

  return mongoose.model('ticket', schema);
};
