const attempt = require('lodash/attempt');
const camelCase = require('lodash/camelCase');
const isError = require('lodash/isError');

const safeParse = (data) => {
  let json = attempt(() => {
    return JSON.parse(data);
  }, {});

  return isError(json) ? {} : json;
};

const camelizeKeys = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((v) => camelizeKeys(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: camelizeKeys(obj[key]),
      }),
      {}
    );
  }
  return obj;
};

module.exports = { safeParse, camelizeKeys };
