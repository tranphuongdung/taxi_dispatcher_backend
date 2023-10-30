const responder = require('./responder');
const { isBlank } = require('../utils/lang.js');

const error = (req, res, error) => {
  // Default code
  error.code = error.code || 400;

  res.status(error.code).send({ error_code: error.error_code, error: error.message });
};

const resourceNotFound = (resource, resourceName = null) => {
  if (isBlank(resource)) {
    throw responder.resourceNotFound(resourceName);
  }

  return resource;
};

const resourceAlreadyAdded = (resource, resourceName = null) => {
  if (!isBlank(resource)) {
    throw responder.resourceAlreadyAdded(resourceName);
  }

  return resource;
};

const resourceEmailExists = (resource) => {
  if (!isBlank(resource)) {
    throw responder.resourceEmailExists();
  }

  return resource;
};

const resourceUidExists = () => {
  throw responder.resourceUidExists();
};

const resourceInvalidPasswordForm = (resourceName = null) => {
  throw responder.resourceInvalidPasswordForm(resourceName);
};

const resourceInvalidEmailForm = (resourceName = null) => {
  throw responder.resourceInvalidEmailForm(resourceName);
};

const unprocessableEntity = (message) => {
  throw responder.unprocessableEntity(message);
};

const blankResource = (resource, code, message) => {
  if (isBlank(resource)) {
    throw { code, message };
  }

  return resource;
};

const resourceNotAvailableToUser = (message) => {
  throw responder.resourceNotAvailableToUser(message);
};

const checkFrozenUser = (user) => {
  if (user?.frozen) {
    throw { code: 401, message: `The user's account is frozen. Please try again.` };
  }

  return user;
};
module.exports = {
  error,
  blankResource,
  resourceNotFound,
  resourceAlreadyAdded,
  resourceEmailExists,
  resourceUidExists,
  resourceInvalidPasswordForm,
  resourceInvalidEmailForm,
  unprocessableEntity,
  resourceNotAvailableToUser,
  checkFrozenUser,
};
