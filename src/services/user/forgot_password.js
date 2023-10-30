const { isBlank } = require('../../utils/lang');
const crypto = require('crypto');

const models = require('../../models');
const responder = require('../../helpers/responder');
const mailers = require('../mailer');

class ForgotPassword {
  static call(params) {
    const instance = new this(params);

    return instance.call();
  }

  constructor(params) {
    this.email = params.email;
    this.role = params.role;
  }

  async call() {
    this.validate();

    const user = await this.user();
    user.resetToken = this.resetToken();

    return user.save().then((result) => {
      mailers.user.sendResetPassword(user);

      return result;
    });
  }

  validate() {
    if (!isBlank(this.email)) return;

    throw responder.unprocessableEntity('Email address is required.');
  }

  resetToken() {
    return crypto.randomBytes(6).toString('hex');
  }

  user() {
    let model;
    switch (this.role) {
      case 'client':
        model = models.Client;
        break;
      case 'driver':
        model = models.Driver;
        break;
      case 'employee':
        model = models.Employee;
        break;
    }
    return model.findOne({ where: { email: this.email } }).then((user) => {
      if (!(user && user.id)) {
        throw responder.unprocessableEntity('There is no user with this email address.');
      }

      return user;
    });
  }
}

module.exports = () => {
  return ForgotPassword;
};
