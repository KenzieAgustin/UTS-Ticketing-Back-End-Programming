const authService = require('./auth-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// POST /api/auth/register
async function register(request, response, next) {
  try {
    const { name, email, password, confirmPassword } = request.body;

    if (!name) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Name is required');
    }
    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }
    if (!password) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }
    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }
    // pw minimal 8 karakter
    if (password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters'
      );
    }

    const result = await authService.register(name, email, password);

    if (!result) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email is already registered'
      );
    }

    return response.status(201).json({
      message: 'User registered successfully',
      user: result,
    });
  } catch (error) {
    return next(error);
  }
}

// POST /api/auth/login
async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }
    if (!password) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Password is required');
    }

    const loginResult = await authService.checkLogin(email, password);

    if (!loginResult) {
      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    return response.status(200).json(loginResult);
  } catch (error) {
    return next(error);
  }
}

// GET /api/auth/protected
async function testProtected(request, response, next) {
  try {
    return response.status(200).json({ message: 'OK' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  register,
  login,
  testProtected,
};
