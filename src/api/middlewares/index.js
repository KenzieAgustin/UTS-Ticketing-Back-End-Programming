const authMiddleware = require('./authentication');
const adminMiddleware = require('./admin');

module.exports = {
  authMiddleware,
  adminMiddleware,
};
