const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    movieName: {
      type: String,
      required: [true, 'Movie name is required'],
      trim: true,
    },
    seatNumber: {
      type: String,
      required: [true, 'Seat number is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['LOCKED', 'CONFIRMED', 'CANCELLED'],
      default: 'CONFIRMED',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
