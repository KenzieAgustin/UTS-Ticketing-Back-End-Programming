module.exports = (db) =>
  db.model(
    'Theathers', // Nama model ini yang akan di-export oleh index.js
    db.Schema({
      name: { type: String, required: true },
      location: { type: String, required: true },
      city: { type: String, required: true },
    })
  );