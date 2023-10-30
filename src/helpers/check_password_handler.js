const exceptionHandler = require('./exception_handler');

const atLeast4Characters = (password, resourceName = null) => {
  // 数字と英字を最低１つ含む4文字以上で入力してください
  const regexPattern = /^(?=.*?[a-zA-Z])(?=.*?\d)[a-zA-Z0-9]{4,}$/;
  checkPassword(regexPattern, password, resourceName);
};

const atLeast8Characters = (password, resourceName = null) => {
  // 半角英数字8文字以上で入力してください
  const regexPattern = /^[a-zA-Z0-9]{8,}$/;
  checkPassword(regexPattern, password, resourceName);
};

const checkPassword = (regexPattern, password, resourceName = null) => {
  const isValid = regexPattern.test(password);
  if (isValid) return;

  exceptionHandler.resourceInvalidPasswordForm(resourceName);
};

module.exports = {
  atLeast4Characters,
  atLeast8Characters,
};
