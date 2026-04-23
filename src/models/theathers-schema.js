const mongoose = require('mongoose');

const theathersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Theather name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Theathers', theathersSchema);
