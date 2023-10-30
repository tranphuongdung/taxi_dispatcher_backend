const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = (plaintextPassword, password) => {
  return bcrypt.compare(plaintextPassword, password);
};

module.exports = { hashPassword, comparePassword };
