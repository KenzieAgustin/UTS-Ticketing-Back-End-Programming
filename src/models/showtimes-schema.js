const mongoose = require('mongoose');

const showtimesSchema = new mongoose.Schema(
  {
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: [true, 'Movie ID is required'],
    },
    theather_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Theathers',
      required: [true, 'Theather ID is required'],
    },
    room_id: {
      type: String,
      required: [true, 'Room ID is required'],
      trim: true,
    },
    show_time: {
      type: Date,
      required: [true, 'Show time is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Showtimes', showtimesSchema);
