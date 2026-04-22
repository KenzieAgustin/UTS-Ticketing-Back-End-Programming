module.exports = (db) =>
  db.model(
    'Users',
    db.Schema({
      name: String,
      email: String,
      password: String,
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
    })
  );
