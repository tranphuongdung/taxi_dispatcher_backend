const exceptionHandler = require('./exception_handler');

const isValidEmailForm = (email, resourceName = null) => {
  const regexPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = regexPattern.test(email);
  if (isValid) return;

  exceptionHandler.resourceInvalidEmailForm(resourceName);
};

module.exports = {
  isValidEmailForm,
};
