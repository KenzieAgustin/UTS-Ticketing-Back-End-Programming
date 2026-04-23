const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: [
      {
        type: String,
        trim: true,
      },
    ],
    duration: {
      type: Number, // in minutes
      required: [true, 'Duration is required'],
    },
    director: {
      type: String,
      trim: true,
    },
    cast: [
      {
        type: String,
        trim: true,
      },
    ],
    language: {
      type: String,
      default: 'Indonesian',
    },
    rating: {
      type: String,
      enum: [
        'G',
        'PG',
        'PG-13',
        'R',
        'NC-17',
        'SU',
        'R13',
        'R15',
        'R17',
        'R21',
      ],
    },
    poster: {
      type: String,
    },
    trailer: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['Coming Soon', 'Now Playing', 'End of Showing'],
      default: 'Coming Soon',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
