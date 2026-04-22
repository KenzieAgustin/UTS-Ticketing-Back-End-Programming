const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authRepository = require('./auth-repository');
const { passwordMatched } = require('../../../utils/password');

const SALT_ROUNDS = 10;

function generateToken(email) {
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    email,
    timestamp: Date.now(),
  };
  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
}

async function register(name, email, password) {
  const existingUser = await authRepository.getUserByEmail(email);
  if (existingUser) {
    return null; // email udah kepake
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await authRepository.createUser(name, email, hashedPassword);

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function checkLogin(email, password) {
  const user = await authRepository.getUserByEmail(email);

  // kalo user tidak ketemu, tetap jalanin pengecekan password pakai dummy
  // biar waktu responnya sama dan hacker ga bisa nebak email mana yang terdaftar
  const userPass = user ? user.password : '<RANDOM>';
  const loginPassed = await passwordMatched(password, userPass);

  if (user && loginPassed) {
    return {
      email: user.email,
      token: generateToken(email),
    };
  }

  return null;
}

module.exports = {
  register,
  checkLogin,
};
