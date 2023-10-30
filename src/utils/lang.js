const isEmpty = require('lodash/isEmpty');
const isNumber = require('lodash/isNumber');

const isBlank = (value) => {
  if (isNumber(value) || value == true) {
    return false;
  }

  return isEmpty(value);
};

const isPresent = (value) => {
  return !isBlank(value);
};

module.exports = {
  isBlank,
  isPresent,
};
