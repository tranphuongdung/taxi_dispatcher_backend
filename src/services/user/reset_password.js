const { isBlank } = require('../../utils/lang');
const { hashPassword } = require('../../utils/bcrypt');

const models = require('../../models');
const responder = require('../../helpers/responder');

class ResetPassword {
  static call(params) {
    const instance = new this(params);

    return instance.call();
  }

  constructor(params) {
    this.resetToken = params.resetToken;
    this.password = params.password;
    this.confirmationPassword = params.confirmationPassword;
    this.role = params.role;
  }

  async call() {
    this.validate();

    const user = await this.user();
    user.password = await hashPassword(this.password);
    user.resetToken = null;

    return user.save();
  }

  validate() {
    if (isBlank(this.resetToken)) {
      throw responder.unprocessableEntity('Reset token is required.');
    }

    if (isBlank(this.password) || isBlank(this.confirmationPassword)) {
      throw responder.unprocessableEntity('Password and confirmation password is required.');
    }

    if (this.password != this.confirmationPassword) {
      throw responder.unprocessableEntity('Password and confirmation password does not match.');
    }
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
    return model.findOne({ where: { resetToken: this.resetToken } }).then((user) => {
      if (!(user && user.id)) {
        throw responder.unprocessableEntity('Reset token is invalid.');
      }

      return user;
    });
  }
}

module.exports = () => {
  return ResetPassword;
};
