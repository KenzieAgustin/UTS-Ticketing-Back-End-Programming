const { Users } = require('../../../models');

async function getUserByEmail(email) {
  return Users.findOne({ email });
}

async function createUser(name, email, hashedPassword) {
  return Users.create({ name, email, password: hashedPassword, role: 'user' });
}

module.exports = {
  getUserByEmail,
  createUser,
};
