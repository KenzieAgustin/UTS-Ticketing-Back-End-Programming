const { errorResponder, errorTypes } = require('../../core/errors');

module.exports = (request, response, next) => {
  if (request.user.role !== 'admin') {
    return next(errorResponder(errorTypes.FORBIDDEN, 'Admin access only'));
  }
  return next();
};
