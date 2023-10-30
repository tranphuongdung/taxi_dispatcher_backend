const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET_KEY;

exports.decode = (token) => {
  return jwt.decode(token, secret_key);
};

exports.encode = (data) => {
  return jwt.sign(data, secret_key);
};
