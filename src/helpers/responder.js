const resolve = (data) => {
  return new Promise((resolve) => resolve(data));
};

const reject = (data) => {
  return new Promise((_resolve, reject) => reject(data));
};

const resourceNotFound = (resourceName = 'Resource') => {
  return { code: 404, message: `${resourceName} Not Found`, error_code: 'not_found' };
};

const resourceAlreadyAdded = (resourceName = 'Resource') => {
  return { code: 400, message: `${resourceName} already added`, error_code: 'already_added' };
};

const resourceEmailExists = () => {
  return { code: 400, message: `Email already exists`, error_code: 'email_exists' };
};

const resourceUidExists = () => {
  return { code: 400, message: `Uid already exists`, error_code: 'uid_exists' };
};

const resourceInvalidPasswordForm = (resourceName = 'Resource') => {
  return { code: 400, message: `Invalid form of password for ${resourceName}`, error_code: 'invalid_password_form' };
};

const resourceInvalidEmailForm = (resourceName = 'Resource') => {
  return { code: 400, message: `Invalid form of email for ${resourceName}`, error_code: 'invalid_email_form' };
};

const unprocessableEntity = (message = 'Invalid parameters') => {
  return { code: 422, message: message };
};

const unauthorizedResource = (message = 'Unauthorized') => {
  return { code: 401, message: message };
};

// When a user attempts to access a resource that is not under the course they are taking
const resourceNotAvailableToUser = (message = 'Resource not available') => {
  return { code: 403, message: message, error_code: 'not_available_to_user' };
};

module.exports = {
  resolve,
  reject,
  unauthorizedResource,
  resourceNotFound,
  resourceAlreadyAdded,
  resourceEmailExists,
  resourceUidExists,
  resourceInvalidPasswordForm,
  resourceInvalidEmailForm,
  unprocessableEntity,
  resourceNotAvailableToUser,
};
