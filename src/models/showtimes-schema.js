const mongoose = require('mongoose');

module.exports = (db) =>
  db.model(
    'Showtimes',
    db.Schema({
      // Ubah ref dari 'Movies' menjadi 'Movie' (sesuai module.exports di movie model)
      movie_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
      },

      // Pastikan ini juga sesuai dengan nama model di theather-schema.js
      theather_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theathers',
        required: true,
      },

      room_id: { type: String, required: true },
      show_time: { type: Date, required: true },
      price: { type: Number, required: true },
    })
  );
