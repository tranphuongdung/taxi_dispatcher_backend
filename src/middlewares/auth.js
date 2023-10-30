const models = require('../models');
const Jwt = require('../utils/jwt');
const moment = require('moment');
const exceptionHandler = require('../helpers/exception_handler');

exports.verifyToken = (req, res, next) => {
  return new Promise((resolve) => {
    if (!req.headers['api-token']) {
      handleInvalidToken(req, res);
      return;
    }

    let tokenData = Jwt.decode(req.headers['api-token']);
    if (tokenData && tokenData.id) {
      resourceModel(req, res, tokenData)
        .findByPk(tokenData.id)
        .then((resource) => {
          if (resource && tokenData.id === resource.id) {
            req.currentUser = resource;
            req.request_id = moment().format('x');
            resolve();
          } else {
            handleInvalidToken(req, res);
          }
        })
        .catch(() => {
          handleInvalidToken(req, res);
        });
    } else {
      handleInvalidToken(req, res);
    }
  }).then(() => next());
};

const handleInvalidToken = (req, res) => {
  exceptionHandler.error(req, res, {
    code: 401,
    message: 'Invalid Token',
  });
};

const resourceModel = (req, res, tokenData) => {
  switch (tokenData.role) {
    case 'client':
      return models.Client;
    case 'driver':
      return models.Driver;
    case 'employee':
      return models.Employee;
    default:
      handleInvalidToken(req, res);
  }
};
