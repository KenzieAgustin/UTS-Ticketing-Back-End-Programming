const User = require('../../../models/users-schema');

async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function createUser(name, email, hashedPassword) {
  return User.create({ name, email, password: hashedPassword, role: 'user' });
}

module.exports = {
  getUserByEmail,
  createUser,
};
