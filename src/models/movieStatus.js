const mongoose = require('mongoose');

const movieStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Status name is required'],
      enum: ['Coming Soon', 'Now Playing', 'End of Showing'],
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MovieStatus', movieStatusSchema);
